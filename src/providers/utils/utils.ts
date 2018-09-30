import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilsProvider {

  // [Estado da rede: online ou offline]
  private _NETWORK_AVAILABLE: boolean = (this.network.type === 'none') ? false : true;

  constructor(
    private toast: ToastController,
    private network: Network,
  ) {
  }


  /**
   * Retorna true caso o dispositivo esteja conectado à internet.
   * Retorna false caso contrário.
   * Quando não estiver conectado à internet, uma mensagem de erro é exibida informando o usuário disso.
   */
  public get NETWORK_AVAILABLE() {

    this._NETWORK_AVAILABLE = (this.network.type === 'none') ? false : true;

    if (!this._NETWORK_AVAILABLE) {
      this.error('Você está offline, conecte-se à internet para usar o Talk-Hawk.');
    }

    return this._NETWORK_AVAILABLE;
  }


  /**
   * Mostra uma mensagem de erro
   * @param message mensagem de erro
   */
  error = (message) => {
    this.showToast(message, true);
  }


  /**
   * Mostra uma mensagem comum
   * @param message mensagem
   */
  alert = (message) => {
    this.showToast(message);
  }


  /**
   * Método privado usado para exibir um toast
   * @param msg mensagem
   * @param isError se informado, exibe um toast com fundo vermelho.
   */
  private showToast = (msg, isError?) => {

    let toastOptions = (isError) ?
      {
        message: msg,
        duration: 5000,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'fechar',
        cssClass: 'toast-error'
      } : {
        message: msg,
        duration: 4000,
        position: 'top'
      };


    this.toast
      .create(toastOptions)
      .present();
  }

}
