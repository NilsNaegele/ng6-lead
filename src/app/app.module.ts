import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DemoComponent } from './shared/components/demo/demo.component';
import { LoginComponent } from './components/login/login.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DemoComponent,
    LoginComponent,
    ContactsComponent,
    ContactDetailsComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
      { path: 'contact/:id', component: ContactDetailsComponent, canActivate: [AuthGuard] },
      { path: 'demo', component: DemoComponent, canActivate: [AuthGuard] },
      { path: 'table-view', component: TableComponent, canActivate: [AuthGuard] },
      { path: '**', component: ContactsComponent, canActivate: [AuthGuard] },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
