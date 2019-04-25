import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { MessagesComponent } from './shared/components/messages/messages.component';
import { UsersListComponent } from './modules/users/users-list/users-list.component';
import { UserDetailsComponent } from './modules/users/user-details/user-details.component';
import { ReposListComponent } from './modules/repos/repos-list/repos-list.component';
import { RepoDetailsComponent } from './modules/repos/repo-details/repo-details.component';
import { MessagesService } from './shared/services/messages.services';
import { LoaderService } from './shared/services/loader.service';
import { DataStorageService } from './shared/services/dataStorage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GlobalErrorHandler } from './shared/services/globalErrorHandler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { MenuComponent } from './modules/menu/menu.component';
import { HeaderComponent } from './modules/header/header.component';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    MessagesComponent,
    MenuComponent,
    HeaderComponent,
    UsersListComponent,
    MainPageComponent,
    PageNotFoundComponent,
    UserDetailsComponent,
    ReposListComponent,
    RepoDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    FormsModule,
    ButtonModule
  ],
  providers: [
    MessagesService,
    LoaderService,
    DataStorageService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
