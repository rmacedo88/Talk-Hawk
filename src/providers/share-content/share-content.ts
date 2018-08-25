import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class ShareContentProvider {


  // [Assinatura padrão do aplicativo Talk Hawk]
  private _signature: string = '\n Enviado do Aplicativo Talk Hawk !';


  constructor(private socialSharing: SocialSharing) {
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
  public shareContent = (platform: string = this.required('platform'), msg: string = this.required('msg')) => {

    // [Concatena a mensagem à assinatura padrão do Talk Hawk]
    msg = `${msg} ${this._signature}`;

    switch (platform) {
      // [Envia para o menu 'compartilhar' do sistema operacional]
      case 'default':
        this.socialSharing.share(msg, null, null, null);
        break;

      case 'whatsapp':
        this.socialSharing.shareViaWhatsApp(msg, null, null);
        break;

      case 'twitter':
        this.socialSharing.shareViaTwitter(msg, null, null);
        break;

      case 'facebook':
        this.socialSharing.shareViaFacebook(msg, null, null);
        break;

      default:
        break;
    }
  };


}
