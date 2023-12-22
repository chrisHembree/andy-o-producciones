import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetratosComponent } from './retratos/retratos.component';
import { ReelComponent } from './reel/reel.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'retratos', component: RetratosComponent },
  { path: 'reel', component: ReelComponent },
  { path: 'contacto', component: ContactoComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
