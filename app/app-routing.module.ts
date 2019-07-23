import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { PreviewComponent } from './preview/preview.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "dashboard", component: DashboardComponent, children:[
    {path: "service", component: CreateServiceComponent},
    {path: "invoice", component: InvoiceComponent},
    {path: "createinvoice", component: CreateInvoiceComponent},
    {path: "preview", component: PreviewComponent},
    {path: "clients", component: ClientsComponent},
    {path: "add_client", component: AddClientComponent},
    {path: "edit_client", component: EditClientComponent},
    {path: "settings", component: SettingsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
