import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ValidateService } from './services/validate.service';
import { WebsocketService } from './services/websocket.service';
import { AuthService } from './services/auth.service';
import { StockService } from './services/stock.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { TableRowComponent } from './components/table-row/table-row.component';
import { StockHistoryComponent } from './components/stock-history/stock-history.component'

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'stocks/:stockId', component: StockHistoryComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    TableRowComponent,
    StockHistoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, StockService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
