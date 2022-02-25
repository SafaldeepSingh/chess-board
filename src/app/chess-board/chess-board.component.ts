import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MoveChange, NgxChessBoardView} from "ngx-chess-board";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {
  @ViewChild('chessBoard', {static:false}) board: NgxChessBoardView | undefined
  boardId = 0
  loaded = false
  constructor(
    public route: ActivatedRoute
  ) {
    route.queryParams.subscribe(params => {
      this.boardId = parseInt(params.id)
      // console.log("board", this.board)
    })
  }

  ngOnInit(): void {
    window.addEventListener("message", event => {
      const fen = event.data.fen
      // console.log("iframe fen", fen)
      if(fen){
        this.board?.setFEN(fen)
        if(this.boardId === 1)
          this.board?.reverse()
      }else if(event.data.reset){
        // console.log("reset true", this.board)
        localStorage.clear()
        this.board?.reset()
      }
    })
    const checkBoardInit = setInterval(() => {
      if(this.board != null){
        //reverse 2nd Board
        console.log("bid", this.boardId)
        this.loaded = true
        if(this.boardId === 1)
          this.board.reverse()
        window.parent.postMessage({loaded: true}, "*")
        clearInterval(checkBoardInit)
      }
    },500)
    // console.log("board", this.board)
  }

  onMove() {
    if(this.board){
      const fen = this.board.getFEN()
      window.localStorage.setItem("gameState", fen)
      window.parent.postMessage({fen, id: this.boardId}, "*")
      // window.parent.postMessage({checkmate: true, id: this.boardId}, "*")
    }
  }

  onCheckMate() {
    //TODO check this
    window.localStorage.clear()
    console.log("iframe checkmate")
    window.parent.postMessage({checkmate: true, id: this.boardId}, "*")
  }
  getCurrentPlayer(fen: String){
    return fen.split(' ')[1] =='b'?1:0
  }

}
