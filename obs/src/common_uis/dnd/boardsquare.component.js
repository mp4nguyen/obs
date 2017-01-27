import React,{Component,PropTypes} from 'react';
import {DropTarget} from 'react-dnd';

import {ItemTypes} from './game';
import {moveKnight,canMoveKnight} from './game';
import Square from './Square.component';

var squareTarget = {
  drop: function(props){
    moveKnight(props.x,props.y);
  },
  canDrop: function(props){
    return canMoveKnight(props.x,props.y);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),    
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class BoardSquare extends Component{
  static propTypes={
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  }

  renderOverlay(color) {
      return (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: color,
        }} />
      );
  }

  render(){
    var x = this.props.x;
    var y = this.props.y;
    var canDrop = this.props.canDrop;

    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;
    var black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}

      </div>
    );
  }
};

export default DropTarget(ItemTypes.KNIGHT,squareTarget,collect)(BoardSquare);
