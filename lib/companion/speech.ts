export interface SpeechOptions {
  pitch?: number;
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

export function stripEmojis(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export class CyberBotSpeechEngine {
  private static instance: CyberBotSpeechEngine;
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private speaking = false;

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  public static getInstance(): CyberBotSpeechEngine {
    if (!CyberBotSpeechEngine.instance) {
      CyberBotSpeechEngine.instance = new CyberBotSpeechEngine();
    }
    return CyberBotSpeechEngine.instance;
  }

  private initVoice(): void {
    if (!this.synth) return;
    try {
      const voices = this.synth.getVoices();
      if (!voices || voices.length === 0) return;
      this.selectedVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Enhanced') ||
              v.name.includes('Samantha') ||
              v.name.includes('Daniel')),
        ) ||
        voices.find((v) => v.lang.startsWith('en')) ||
        voices[0] ||
        null;
    } catch {
      this.selectedVoice = null;
    }
  }

  public isAvailable(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && this.synth !== null;
  }

  public isCurrentlySpeaking(): boolean {
    return this.speaking;
  }

  public speak(text: string, options?: SpeechOptions): void {
    if (!this.synth) {
      options?.onEnd?.();
      return;
    }

    try {
      this.cancel();

      const cleanedText = stripEmojis(text);
      if (!cleanedText) {
        options?.onEnd?.();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }
      utterance.pitch = options?.pitch ?? 1.12;
      utterance.rate = options?.rate ?? 1.04;

      utterance.onstart = () => {
        this.speaking = true;
        options?.onStart?.();
      };

      utterance.onend = () => {
        this.speaking = false;
        options?.onEnd?.();
      };

      utterance.onerror = () => {
        this.speaking = false;
        options?.onEnd?.();
      };

      this.synth.speak(utterance);
    } catch {
      this.speaking = false;
      options?.onEnd?.();
    }
  }

  public cancel(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
    }
    this.speaking = false;
  }
}
