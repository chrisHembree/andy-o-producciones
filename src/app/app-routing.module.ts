import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetratosComponent } from './retratos/retratos.component';
import { ReelComponent } from './reel/reel.component';  // Adjust the path
import { ContactoComponent } from './contacto/contacto.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'retratos', component: RetratosComponent },
  { path: 'reel', component: ReelComponent },
  { path: 'contacto', component: ContactoComponent },
  // Add more routes as needed
  { path: '', redirectTo: '/cinematografia', pathMatch: 'full' }, // Redirect to cinematografia by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
