import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Injectable } from '@angular/core';

@Injectable()
export class VoiceRecognitionProvider {

  constructor(public speech: SpeechRecognition) { }


  /**
   *
   */
  isRecognitionAvailable = async () => {
    return await this.speech.isRecognitionAvailable();
  }


  /**
   *
   */
  listen = async () => {
    return await this.speech.startListening().toPromise();
  }


  /**
   *
   */
  hasPermission = async () => {
    return await this.hasPermission();
  }


  /**
   *
   */
  requestPermission = async () => {
    this.requestPermission();
  }
}
