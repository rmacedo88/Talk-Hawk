import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Injectable } from '@angular/core';

@Injectable()
export class VoiceRecognitionProvider {

  // [Opções do reconhecimento de voz]
  private options = {
    language: 'en-US', // [Idioma a ser tratado: Fixo em inglês por determinação do modo carreira]
    matches: 1, // [Traz apenas uma frase. Poderia trazer mais de uma mas a primeira é sempre a mais relevante.]
    showPopup: false // [Não exibe um popup do Android. Isso é tratado na própria interface do Talk Hawk]
  };


  /**
   * O dispositivo vai solicitar a permissão do usuário
   * para o Talk-Hawk usar o microfone e essa permissão
   * ficará guardada nessa variável.
   */
  public HAS_PERMISSION: boolean = false;


  constructor(private speech: SpeechRecognition) {

  }


  /**
   * Checa se o app tem permissão para usar o microfone.
   * Caso não tenha solicita do usuário essa permissão.
   */
  public requestPermission = () => {
    this.speech.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speech.requestPermission()
            .then(
              () => this.HAS_PERMISSION = true,
              () => this.HAS_PERMISSION = false
            )
        }
      });
  }


  /**
   * Captura a voz do usuário e devolve o texto correspondente às palavras ditas
   */
  public listen = () => {
    return this.speech.startListening(this.options);
  }

}
