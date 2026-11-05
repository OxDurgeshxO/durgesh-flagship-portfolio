export interface VoiceCommandResult {
  action:
    | 'flip'
    | 'projects'
    | 'tour'
    | 'resume'
    | 'contact'
    | 'mute'
    | 'voice'
    | 'skin'
    | 'dance'
    | 'query'
  transcript: string
  matchedQuery?: string
}

export class CyberBotVoiceListener {
  private static instance: CyberBotVoiceListener
  private recognition: any = null
  private listening = false
  private timeoutTimer: any = null
  private onResultCallback: ((result: VoiceCommandResult) => void) | null = null
  private onStateChange: ((listening: boolean) => void) | null = null

  private constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRec =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRec) {
        try {
          this.recognition = new SpeechRec()
          this.recognition.continuous = false
          this.recognition.interimResults = false
          this.recognition.lang = 'en-US'

          this.recognition.onstart = () => {
            this.listening = true
            this.onStateChange?.(true)
          }

          this.recognition.onend = () => {
            this.cleanup()
          }

          this.recognition.onerror = () => {
            this.cleanup()
          }

          this.recognition.onresult = (event: any) => {
            const text =
              event.results?.[0]?.[0]?.transcript?.trim().toLowerCase() || ''
            this.cleanup()
            this.handleTranscript(text)
          }
        } catch {
          this.recognition = null
        }
      }
    }
  }

  public static getInstance(): CyberBotVoiceListener {
    if (!CyberBotVoiceListener.instance) {
      CyberBotVoiceListener.instance = new CyberBotVoiceListener()
    }
    return CyberBotVoiceListener.instance
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && this.recognition !== null
  }

  public isCurrentlyListening(): boolean {
    return this.listening
  }

  public setCallback(onResult: (res: VoiceCommandResult) => void): void {
    this.onResultCallback = onResult
  }

  public listen(
    onResult: (res: VoiceCommandResult) => void,
    onState?: (active: boolean) => void,
    timeoutMs = 6000
  ): void {
    this.onResultCallback = onResult
    this.onStateChange = onState || null

    if (!this.recognition) return

    if (this.listening) {
      this.stop()
      return
    }

    try {
      this.recognition.start()
      if (this.timeoutTimer) clearTimeout(this.timeoutTimer)
      this.timeoutTimer = setTimeout(() => {
        this.stop()
      }, timeoutMs)
    } catch {
      this.cleanup()
    }
  }

  public stop(): void {
    if (this.recognition && this.listening) {
      try {
        this.recognition.stop()
      } catch {}
    }
    this.cleanup()
  }

  private cleanup(): void {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer)
      this.timeoutTimer = null
    }
    this.listening = false
    this.onStateChange?.(false)
  }

  public handleTranscript(text: string): void {
    if (!text || !this.onResultCallback) return

    if (/flip|spin|stunt|trick|jump/.test(text)) {
      this.onResultCallback({ action: 'flip', transcript: text })
    } else if (/project|work|portfolio|apps/.test(text)) {
      this.onResultCallback({ action: 'projects', transcript: text })
    } else if (/tour|guide|walkthrough/.test(text)) {
      this.onResultCallback({ action: 'tour', transcript: text })
    } else if (/resume|cv|pdf/.test(text)) {
      this.onResultCallback({ action: 'resume', transcript: text })
    } else if (/contact|email|message|hire/.test(text)) {
      this.onResultCallback({ action: 'contact', transcript: text })
    } else if (/mute|unmute|sound|audio/.test(text)) {
      this.onResultCallback({ action: 'mute', transcript: text })
    } else if (/voice|speech|jarvis/.test(text)) {
      this.onResultCallback({ action: 'voice', transcript: text })
    } else if (/skin|theme|color|look/.test(text)) {
      this.onResultCallback({ action: 'skin', transcript: text })
    } else if (/dance|party|beat|groove|music/.test(text)) {
      this.onResultCallback({ action: 'dance', transcript: text })
    } else {
      this.onResultCallback({
        action: 'query',
        transcript: text,
        matchedQuery: text,
      })
    }
  }
}
