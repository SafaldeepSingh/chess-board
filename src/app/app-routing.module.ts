import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainFrameComponent} from "./main-frame/main-frame.component";
import {ChessBoardComponent} from "./chess-board/chess-board.component";

const routes: Routes = [
  {path: '', component: MainFrameComponent},
  {path: 'iframepage', component: ChessBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
