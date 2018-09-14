import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular';
import { switchMap } from 'rxjs/operators/switchMap';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthProvider {

  public user: any;

  public _ID_TOKEN: string;

  toastTemplate: {
    duration: 3000,
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: 'fechar'
  }

  constructor(
    public afAuth: AngularFireAuth,
    private toast: ToastController,
    private afs: AngularFirestore,
  ) {

    let _uid: string;

    /*
     * Observa o comportamento do estado da autenticação, quando o
     * usuário fizer login seus dados serão recuperados.
     */
    this.afAuth.authState
      .pipe(
        switchMap((auth) => {
          _uid = auth.uid;
          return (auth) ? this.afs.doc<any>(`users/${auth.uid}`).valueChanges() : of(null);
        }
        )).subscribe(user => {

          // [Constrói o objeto do usuário, concatenando o user id às demais informações deste.]
          const __buildUser = () => { this.user = { uid: _uid, ...user } };

          // [Se a subscrição do authState retornou um usuário, chama o método __buildUser e deixa esse usuário disponível para leitura]
          (user) ? __buildUser() : null;

        });

        
    // Recupera o ID_TOKEN
    this.afAuth.idToken.subscribe(idToken => {
      this._ID_TOKEN = idToken;
    });

  }


  private required = (name?) => { throw new Error(`O parâmetro ${name || ''} é obrigatório.`) };


  /**
   *
   * @param email
   * @param password
   */
  public _signin = async (
    email: string = this.required('email'),
    password: string = this.required('senha')
  ) => {
    try {

      return await this.afAuth.auth.signInWithEmailAndPassword(email, password);

    } catch (e) {

      this.toast.create({
        message: this.firebaseError(e.code),
        duration: 3000
      }).present();

      return false;
    }
  }


  /**
   *
   * @param email
   * @param password
   * @param name
   */
  public _signup = async (
    email: string = this.required('email'),
    password: string = this.required('senha'),
    name: string = this.required('nome')
  ) => {
    try {

      await Promise.all([
        this.afAuth.auth.createUserWithEmailAndPassword(email, password),
        this.afs.collection('users')
      ]
      ).then(async (taskQueue) => {
        const AUTH = 0;
        const DATABASE = 1;

        await taskQueue[DATABASE]
          .doc(taskQueue[AUTH].uid)
          .set({
            name: name,
            email: email,
            createdAt: new Date()
          });

        return true;
      });

    } catch (e) {
      this.toast.create({
        message: this.firebaseError(e.code),
        duration: 3000
      }).present();
      return false;
    }
  }

  signin(email, password): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email, password): Promise<any> {
    return new Promise((_resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((userData) => {

          this.afs.collection('user')
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
    this.afAuth.auth.signOut()
      .then(() => {
        this.toast.create({ message: 'Você saiu do Hawk-Talk', ...this.toastTemplate });
      });
  }

  resetPassword(email): Promise<any> {
    return new Promise((_resolve, _reject) => {
      this.afAuth.auth.sendPasswordResetEmail(email)
        .then(() => {
          this.toast.create({ message: 'Siga ga as instruções no seu email', ...this.toastTemplate });
        });
    });
  }


  private firebaseError = (errorCode: string) => {
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

      // Other errors
      default:
        errorCode = 'Erro no nosso servidor. Tente novamente.';
        break;
    }

    return errorCode;
  }
}
