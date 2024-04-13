import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideToastr({
      timeOut: 1000, // Display for 5 seconds
      positionClass: 'toast-top-right', // Position at bottom-left
      preventDuplicates: true, // Prevent duplicates
      closeButton: true, // Enable close button
      progressBar: true, // Show progress bar
    }),
  ],
};
