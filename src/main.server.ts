import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app/router';

const bootstrap = () => bootstrapApplication(AppComponent,{
    providers: [
      provideHttpClient(),
      importProvidersFrom(
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes)
      )
    ]
  });

export default bootstrap;
