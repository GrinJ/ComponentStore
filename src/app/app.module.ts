import { TuiRootModule, TuiDialogModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FileUploaderComponent } from './file-uploader/file-uploader.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Base imports
    BrowserModule,
    BrowserAnimationsModule,
    EventPluginsModule,
    PolymorpheusModule,
    AppRoutingModule,
    // Taiga UI core modules
    TuiRootModule,
    TuiDialogModule,
    // File uploader standalone component - you need only this import
    FileUploaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
