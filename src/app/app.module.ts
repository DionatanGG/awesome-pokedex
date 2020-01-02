import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AuthService } from './shared/services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { TypeFilterPipe } from './shared/pipes/typeFilter.pipe';
import { AbilitiesFilterPipe } from './shared/pipes/abilitiesFilter.pipe';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/modules/material-module';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HeaderComponent,
    SearchPipe,
    TypeFilterPipe,
    AbilitiesFilterPipe,
    HomeComponent,
    PokemonDetailComponent,
    LoaderComponent,
    ProfileDropdownComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
