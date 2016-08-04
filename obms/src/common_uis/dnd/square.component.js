import React,{PropTypes,Component} from 'react';

export default class Square extends Component{
  static propTypes = {
    black: PropTypes.bool
  }

  render(){
    var black = this.props.black;
    var fill = black ? 'black':'white';
    var stroke = black ? 'white':'black';

    return (<div style={{
                          backgroundColor: fill,
                          color: stroke,
                          width: '100%',
                          height: '100%'
                        }}>
              {this.props.children}
            </div>);
  }
};
