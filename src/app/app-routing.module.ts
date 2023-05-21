import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { FormComponent } from './pages/inventory/form/form.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inventory', component: InventoryComponent },
  {path: 'form', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
