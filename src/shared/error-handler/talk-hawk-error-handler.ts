import { ErrorHandler, Injector, Injectable, Inject } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class TalkHawkErrorHandler extends ErrorHandler {


  /**
   *
   * @param injector O Angular não suporta a injeção de dependência convencional.
   * O injetor habilita a injeção de dependência.
   */
  constructor(@Inject(Injector) private injector: Injector) {
    super();
  }


  /**
   * Injeta o ToastController e retorna uma instância dele
   */
  private get toastProvider(): ToastController {
    return this.injector.get(ToastController);
  }


  /**
   * Recupera uma instância do ToastController e mostra as
   *  mensagens de erro na forma de toasts.
   * @param error Mensagem de erro
   */
  handleError(error: any): void {

    // [Mostra o erro na forma de um toast]
    this.toastProvider
      .create({
        message: error,
        duration: 4000,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'fechar',
        cssClass: 'toast-error'
      })
      .present();

    // [Trata o erro da maneira padrão (exibindo no console de erros)]
    // super.handleError(error);
  }

}
