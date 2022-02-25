import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {DialogGameEndComponent} from "../dialog-game-end/dialog-game-end.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.css']
})
export class MainFrameComponent implements OnInit {
  chessBoardUrl1: SafeResourceUrl
  chessBoardUrl2: SafeResourceUrl
  boardSize = 530

  constructor(
    domSanitizer: DomSanitizer,
    public matDialog: MatDialog
  ) {
    this.chessBoardUrl1 = domSanitizer.bypassSecurityTrustResourceUrl('/iframepage?id=0')
    this.chessBoardUrl2 = domSanitizer.bypassSecurityTrustResourceUrl('/iframepage?id=1')
  }

  ngOnInit(): void {
    window.addEventListener("message", event => {
      //only execute when data is received from iframe
      if(event.data.loaded){
        const gameState = localStorage.getItem('gameState')
        if( gameState!= null){
          window.frames[0].postMessage({fen: gameState},"*")
          window.frames[1].postMessage({fen: gameState},"*")
        }

      }
      else if(event.data.fen)
      {
        let fen = event.data.fen
        let id = event.data.id
        // console.log(id, fen)
        let otherFrameId = (id+1)%2
        window.frames[otherFrameId].postMessage({fen},"*")
      }
      else if(event.data.checkmate){
        console.log("mainframe checkmate")
        const endGameDialogRef = this.matDialog.open(DialogGameEndComponent, {disableClose: true})
        endGameDialogRef.afterClosed().subscribe(result => {
          if(result && result == "createNewGame"){
            this.createNewGame()
          }
        })
      }
    })
  }

  createNewGame() {
    window.frames[0].postMessage({reset: true},"*")
    window.frames[1].postMessage({reset: true},"*")
  }
}
