import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { auth } from 'firebase/app';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  public async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
      this.setUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  public async signUp(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.sendVerificationMail();
      this.setUserData(result.user);
    } catch (error) {
      window.alert('E-mail inválido');
    }
  }

  async sendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email-address']);
  }

  public async forgotPassword(passwordResetEmail: any) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      // tslint:disable-next-line: max-line-length
      window.alert('Redefinição de senha enviada, por favor, verifique seu e-mail.\nCaso não encontre o e-mail na caixa de entrada, verifique a caixa de spam.');
      this.router.navigate(['sign-in']);
    } catch (error) {
      window.alert(error);
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  public googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  public async authLogin(provider: any) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
      this.setUserData(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

  public setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  public async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

}
