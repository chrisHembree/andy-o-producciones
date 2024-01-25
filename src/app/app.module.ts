import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReelComponent } from './reel/reel.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RetratosComponent } from './retratos/retratos.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CaptionDialogComponent } from './caption-dialog/caption-dialog.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAnalytics } from "firebase/analytics";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment.development';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ReelComponent,
    ContactoComponent,
    RetratosComponent,
    LoginDialogComponent,
    AdminComponent,
    CaptionDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    provideFirebaseApp(() => initializeApp({"projectId":"andyocine-9546f","appId":"1:529468443196:web:a72fc7b63986211d255139","databaseURL":"https://andyocine-9546f-default-rtdb.firebaseio.com","storageBucket":"andyocine-9546f.appspot.com","apiKey":"AIzaSyBi5XizKrXpU_HI5e9JvwyGpKtILmoU55c","authDomain":"andyocine-9546f.firebaseapp.com","messagingSenderId":"529468443196","measurementId":"G-X04TCS20LH"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
