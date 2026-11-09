// DTMF Frequencies (Hz) for dual-tone multi-frequency phone keypad
const DTMF_FREQS: Record<string, [number, number]> = {
  '1': [697, 1209],
  '2': [697, 1336],
  '3': [697, 1477],
  '4': [770, 1209],
  '5': [770, 1336],
  '6': [770, 1477],
  '7': [852, 1209],
  '8': [852, 1336],
  '9': [852, 1477],
  '*': [941, 1209],
  '0': [941, 1336],
  '#': [941, 1477],
};

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playDtmfTone(key: string, durationMs = 120): void {
  try {
    const freqs = DTMF_FREQS[key] || [440, 880];
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(freqs[0], ctx.currentTime);
    osc2.frequency.setValueAtTime(freqs[1], ctx.currentTime);

    // Smooth envelope to prevent audio clicking
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();

    osc1.stop(ctx.currentTime + durationMs / 1000);
    osc2.stop(ctx.currentTime + durationMs / 1000);
  } catch {
    // Graceful fallback if audio is blocked by browser policies
  }
}

export function playSuccessChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.08 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  } catch {
    // Ignore
  }
}

let activeAudio: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;

function speakWithBrowserSynthesis(
  text: string,
  lang: 'en' | 'bn',
  onStart?: () => void,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;

    utterance.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      if (lang === 'bn') {
        const bnVoice = voices.find(
          (v) =>
            v.lang.startsWith('bn') ||
            v.name.toLowerCase().includes('bengali') ||
            v.name.toLowerCase().includes('bangla')
        );
        if (bnVoice) utterance.voice = bnVoice;
      } else {
        const enVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
        );
        if (enVoice) utterance.voice = enVoice;
      }
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    if (onEnd) onEnd();
  }
}

export function speakSpeech(
  text: string,
  lang: 'en' | 'bn',
  onStart?: () => void,
  onEnd?: () => void
): void {
  stopSpeech();

  if (typeof window !== 'undefined') {
    try {
      const url = `/api/tts?lang=${encodeURIComponent(lang)}&text=${encodeURIComponent(text)}`;
      const audio = new Audio(url);
      activeAudio = audio;

      let started = false;

      audio.onplay = () => {
        started = true;
        if (onStart) onStart();
      };

      audio.onended = () => {
        activeAudio = null;
        if (onEnd) onEnd();
      };

      audio.onerror = (e) => {
        console.warn('TTS streaming API error, attempting browser speech synthesis fallback:', e);
        activeAudio = null;
        speakWithBrowserSynthesis(text, lang, onStart, onEnd);
      };

      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.warn('Audio play prevented or aborted:', err);
          if (!started) {
            activeAudio = null;
            speakWithBrowserSynthesis(text, lang, onStart, onEnd);
          }
        });
      }
      return;
    } catch (e) {
      console.warn('Could not initialize Audio element, falling back:', e);
    }
  }

  speakWithBrowserSynthesis(text, lang, onStart, onEnd);
}

export function stopSpeech(): void {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio.removeAttribute('src');
      activeAudio.load();
    } catch {
      // Ignore
    }
    activeAudio = null;
  }

  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
    activeUtterance = null;
  }
}

