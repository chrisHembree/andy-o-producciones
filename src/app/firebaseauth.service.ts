import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.default.User>;

  adminEmail: string = 'andyocine@gmail.com';
  adminPassword: string = 'chell1994';
  adminUserId: string = 'xxBNT1S1dvhg0KV183VaMWneXnN2';

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      const currentUser = this.afAuth.currentUser;
      if (currentUser && (await currentUser).email !== this.adminEmail) {
        // Sign out non-admin users
        await this.signOut();
        throw new Error('Unauthorized access');
      }
    } catch (error) {
      console.error('Error signing in', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
  }
}
