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


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
