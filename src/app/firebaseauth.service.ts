import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  adminEmail: string = 'andyocine@gmail.com';
  adminPassword: string = 'chell1994';
  adminUserId: string = 'xxBNT1S1dvhg0KV183VaMWneXnN2';

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.pipe(
      tap(user => {
        const isLoggedIn = user ? true : false;
        console.log('isLoggedIn:', isLoggedIn);  // Add this line
        this.isLoggedInSubject.next(isLoggedIn);
    })
    ).subscribe();
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      const currentUser = this.afAuth.currentUser;
      if (currentUser && (await currentUser).email !== 'andyocine@gmail.com') {
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

      this.isLoggedInSubject.next(false);
      console.log('Logout successful');
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
}

}
