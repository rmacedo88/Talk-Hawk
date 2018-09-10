import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareContentProvider } from '../../providers/share-content/share-content';

@IonicPage()
@Component({
  selector: 'page-share-results',
  templateUrl: 'share-results.html',
})
export class ShareResultsPage {

  origin: string;
  data: any;

  sharedContent: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shareContent: ShareContentProvider
  ) {
    this.origin = this.navParams.get('origin');
    this.data = this.navParams.get('data');
  }

  ionViewDidLoad() {
    switch (this.origin) {
      case 'exam-mode':
        this.sharedContent = `Parabéns! O usuário ${this.data.userName} fez ${this.data.points}
                     ponto${(this.data.points > 1) ? 's' : ''} no exame ${this.data.level} do app Talk Hawk!`;
        break;

      case 'career-mode':
        break;

      default:
        break;
    }
  }


  public share = () => {
    this.shareContent.shareContent('default', this.sharedContent);
  }

  public whatsapp = () => {
    this.shareContent.shareContent('whatsapp', this.sharedContent);
  }

  public facebook = () => {
    this.shareContent.shareContent('facebook', this.sharedContent);
  }

  public twitter = () => {
    this.shareContent.shareContent('twitter', this.sharedContent);
  }
}
