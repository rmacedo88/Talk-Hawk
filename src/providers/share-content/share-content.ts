import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class ShareContentProvider {


  // [Assinatura padrão do aplicativo Talk Hawk]
  private _signature: string = '\n Enviado do Aplicativo Talk Hawk !';


  constructor(private socialSharing: SocialSharing, private toast: ToastController) {
  }


  /**
   * Arrow function responsável por validar os parâmetros do método 'shareOn'
   * @param name Nome da variável impressa junto à mensagem de erro. Esse parâmetro NÃO é obrigatório.
   */
  private required = (name?) => { throw new Error(`O parâmetro ${name || ''} é obrigatório.`) };


  /**
   * Arrow function responsável por compartilhar o progresso do usuário nas plataformas
   * suportadas pelo parâmetro 'platform'
   * @param platform Aceita os valores: ['default', 'whatsapp', 'twitter' e 'facebook']
   * @param msg Mensagem compartilhada pelo usuário
   */
  public shareContent = async (
    platform: string = this.required('platform'),
    msg: string = this.required('msg')
  ) => {
    try {
      let test: string;
      // [Concatena a mensagem à assinatura padrão do Talk Hawk]
      msg = `${msg} ${this._signature}`;

      switch (platform) {
        // [Envia para o menu 'compartilhar' do sistema operacional]
        case 'default':
          test = await this.socialSharing.share(msg, null, null, null);
          break;

        case 'whatsapp':
          test = await this.socialSharing.shareViaWhatsApp(msg, null, null);
          break;

        case 'twitter':
          test = await this.socialSharing.shareViaTwitter(msg, null, null);
          break;

        case 'facebook':
          test = await this.socialSharing.shareViaFacebook(msg, null, null);
          break;

        default:
          break;
      }

      this.toast.create({
        message: test,
        duration: 10000
      }).present();

    } catch (error) {
      this.toast.create({
        message: error,
        duration: 10000
      }).present();
    }

  };

}
