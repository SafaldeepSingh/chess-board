import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import {NgxChessBoardModule} from "ngx-chess-board";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { DialogGameEndComponent } from './dialog-game-end/dialog-game-end.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    ChessBoardComponent,
    MainFrameComponent,
    DialogGameEndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot(),
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
