import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomepageModule } from './pages/homepage/homepage.module';
import { ContactsModule } from './pages/contacts/contacts.module';
import { EventsModule } from './pages/events/events.module';
import { AuthenticationModule } from './pages/authentication/authentication.module';
import { ProfileModule } from './pages/profile/profile.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { reducers, metaReducers } from './stores/global.reducers';
import { effects } from './stores/global.effects';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

//Ngrx Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

//Interceptors
import { JwtInterceptor } from '../app/interceptors/jwt.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';


import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';

import localeIt from '@angular/common/locales/it';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


registerLocaleData(localeIt);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    HomepageModule,
    ContactsModule,
    EventsModule,
    ProfileModule,
    AuthenticationModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'it' }


  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
