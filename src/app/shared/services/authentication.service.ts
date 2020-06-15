import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: any;
  userStatus: string;
  userChecked: boolean;
  loginError: Subject<boolean> = new Subject<boolean>();
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  register(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userResponse) => {
        const user = {
          id: userResponse.user.uid,
          userName: userResponse.user.email,
          role: 'user'
        };
        this.firestore.collection('users').add(user)
          .then(user => {
            user.get().then(x => {
              console.log(x.data);
              this.currentUser = x.data();
              this.router.navigate(['/account']);
            })
          })
          .catch(err => {
            console.log('Add to firestore', err);
          });
      })
      .catch(err => {
        console.log('Create user', err);
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.firestore.collection('users').ref.where('userName', '==', user.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            if (userRef.data().role !== 'admin') {
              this.router.navigate(['/account'])
            } else {
              this.userChecked = true;
              this.router.navigate(['/admin']);
            }
          })
        })
        this.loginError.next(false);
      })
      .catch(err => {
        this.loginError.next(true);
      })
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        this.currentUser = null;
        this.userChecked = false;
      })
      .catch(err => {
        console.log('Sign Out', err);
      })
  }

  isLogin(): boolean {
    return this.userChecked;
  }

}
