import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareContentProvider } from '../../providers/share-content/share-content';

@IonicPage()
@Component({
  selector: 'page-share-results',
  templateUrl: 'share-results.html',
})
export class ShareResultsPage {

  // @Input()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shareContent: ShareContentProvider
  ) {
  }

  ionViewDidLoad() {
  }

  test: string = 'O rato roeu a roupa do rei de roma'

  public share = () => {
    this.shareContent.shareContent('default', this.test);
  }

  public whatsapp = () => {
    this.shareContent.shareContent('whatsapp', this.test);
  }

  public facebook = () => {
    this.shareContent.shareContent('facebook', this.test);
  }

  public twitter = () => {
    this.shareContent.shareContent('twitter', this.test);
  }
}
