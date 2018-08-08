import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular';
import { switchMap } from 'rxjs/operators/switchMap';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private MESSAGES: Array<any> =
    [{ SIGNIN_ERROR: 'Erro ao fazer login com email e senha' },
    {}];

  toastTemplate: {
    duration: 3000,
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: 'fechar'
  }

  constructor(
    public angularFireAuthProvider: AngularFireAuth,
    private angularFirestoreProvider: AngularFirestore,
    private toast: ToastController
  ) {

    /*
     * Observa o comportamento do estado da autenticação, quando o
     * usuário fizer login seus dados serão recuperados.
     */
    this.angularFireAuthProvider.authState
      .pipe(
        switchMap(auth => (auth) ? this.angularFirestoreProvider.doc<any>(`user/${auth.uid}`).valueChanges() : of(null))
      ).subscribe(user => {
        if (user) {

        }
      });
  }

  async logar(email, password) {
    try {
      return this.angularFireAuthProvider.auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      this.toast.create({
        message: this.decodeFirebaseErrorCodes(e.code),
        duration: 3000
      }).present();
      return false;
    }
  }

  signin(email, password): Promise<any> {
    return this.angularFireAuthProvider.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email, password): Promise<any> {
    return new Promise((_resolve, reject) => {
      this.angularFireAuthProvider.auth.createUserWithEmailAndPassword(email, password)
        .then((userData) => {

          this.angularFirestoreProvider.collection('user')
            .doc(userData.user.uid)
            .set({
              name: name,
              email: email,
              created: new Date()
            }).then(() => {
              this.toast.create({ message: 'Usuário criado com sucesso!', ...this.toastTemplate });
            });

        }).catch((_err) => {
          reject();
        })
    });
  }

  signout() {
    this.angularFireAuthProvider.auth.signOut()
      .then(() => {
        this.toast.create({ message: 'Você saiu do Hawk-Talk', ...this.toastTemplate });
      });
  }

  resetPassword(email): Promise<any> {
    return new Promise((_resolve, _reject) => {
      this.angularFireAuthProvider.auth.sendPasswordResetEmail(email)
        .then(() => {
          this.toast.create({ message: 'Siga ga as instruções no seu email', ...this.toastTemplate });
        });
    });
  }


  private decodeFirebaseErrorCodes(errorCode: string) {
    switch (errorCode) {
      case 'auth/invalid-email':
      case 'auth/argument-error':
        errorCode = 'O email informado é inválido.';
        break;
      case 'auth/wrong-password':
        errorCode = 'Senha incorreta.';
        break;
      case 'auth/too-many-requests':
        errorCode = 'Multiplas tentativas de login.';
        break;
      case 'auth/user-not-found':
        errorCode = 'Usuário não encontrado.';
        break;
      case 'auth/weak-password':
        errorCode = 'Senha muito fraca.';
        break;
      case 'auth/email-already-in-use':
        errorCode = 'Esse email já está cadastrado.';
        break;
      case 'auth/user-disabled':
        errorCode = 'Usuário desabilitado.';
        break;
      case 'auth/internal-error':
        errorCode = 'Erro interno da autenticação. Tente novamente.';
        break;

      // Not mapped error
      default:
        errorCode = 'Erro no nosso servidor. Tente novamente.';
        break;
    }

    return errorCode;
  }
}
