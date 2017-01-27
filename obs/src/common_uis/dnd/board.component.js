import React,{Component,PropTypes} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Knight from './Knight.component';
import BoardSquare from './BoardSquare.component';
import {moveKnight,canMoveKnight} from './game';

class Board extends Component{
  static propTypes = {
      knightPosition: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  }

  handleSquareClick(x,y){
    if(canMoveKnight(x,y)){
      moveKnight(x,y);
    }
  }
  
  renderPiece(x, y) {
    var knightX = this.props.knightPosition[0]
    var knightY = this.props.knightPosition[1];

    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  renderSquare(i){
      var x = i%8;
      var y = Math.floor(i/8);

      return(
        <div key={i} style={{width: '12.5%',height:'12.5%'}}>
          <BoardSquare x={x} y={y}>
            {this.renderPiece(x,y)}
          </BoardSquare>
        </div>
      );
  }

  render(){
    var squares = [];
    for(var i = 0;i<64;i++){
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
};

export default DragDropContext(HTML5Backend)(Board);
