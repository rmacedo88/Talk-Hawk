import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Injectable()
export class TextSpeakProvider {

  private options = {
    text: null,
    locale: 'en-US',
    rate: 0.5
  };

  constructor(private tts: TextToSpeech) { }

  public talk = (textToSpeak: string) => {
    this.options.text = textToSpeak;
    this.tts.stop();
    this.tts.speak(this.options);
  }

}
