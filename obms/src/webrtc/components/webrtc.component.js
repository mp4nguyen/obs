import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import io from 'socket.io-client';
import lz from 'lz-string';
import {pushACall} from '../../redux/actions/webrtcAction';

const log = (type) => console.log.bind(console, type);



///////////////////////////////////////////////////////

var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
var twilioIceServers = [
     { url: 'stun:global.stun.twilio.com:3478?transport=udp' }
];
//var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
const configuration = {"iceServers": [{url:'stun:stun01.sipphone.com'},
                                      {url:'stun:stun.ekiga.net'},
                                      {url:'stun:stun.fwdnet.net'},
                                      {url:'stun:stun.ideasip.com'},
                                      {url:'stun:stun.iptel.org'},
                                      {url:'stun:stun.rixtelecom.se'},
                                      {url:'stun:stun.schlund.de'},
                                      {url:'stun:stun.l.google.com:19302'},
                                      {url:'stun:stun1.l.google.com:19302'},
                                      {url:'stun:stun2.l.google.com:19302'},
                                      {url:'stun:stun3.l.google.com:19302'},
                                      {url:'stun:stun4.l.google.com:19302'},
                                      {url:'stun:stunserver.org'},
                                      {url:'stun:stun.softjoys.com'},
                                      {url:'stun:stun.voiparound.com'},
                                      {url:'stun:stun.voipbuster.com'},
                                      {url:'stun:stun.voipstunt.com'},
                                      {url:'stun:stun.voxgratia.org'},
                                      {url:'stun:stun.xten.com'},
                                      {
                                      	url: 'turn:numb.viagenie.ca',
                                      	credential: 'muazkh',
                                      	username: 'webrtc@live.com'
                                      },
                                      {
                                      	url: 'turn:192.158.29.39:3478?transport=udp',
                                      	credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                                      	username: '28224511:1379330808'
                                      },
                                      {
                                      	url: 'turn:192.158.29.39:3478?transport=tcp',
                                      	credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                                      	username: '28224511:1379330808'
                                      }]};

// configuration.iceServers = twilioIceServers;
var pcPeers = {};
var localStream = null;
var remoteStream = null;
var socket = null;
var connection = null;
var createPC2;

///////////////////////////////////////////////////////

class WebRTC extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    var that = this;
    this.state = {value: ''};

    //////////
    //connection = new WebSocket('ws://localhost:8000/socket?room=phuong_thql');
    connection = new WebSocket('wss://medicalbookings.redimed.com.au:8009/socket?room=phuong_thql');
    //var socket = new WebSocket("ws://localhost:8080/ws");

    connection.onopen = function () {
      console.log("websocket connected");
      getLocalStream();
    };

    connection.onerror = function (error) {
      console.log('WebSocket Error ',error);
    };

    //to receive the message from server
    connection.onmessage = function (e) {
      console.log('================================================> websocket rev from Server: ' , e.data);
      exchange(JSON.parse(e.data));
    };

    connection.onclose = (e) => {
      // connection closed
      console.log('=======> websocket has closed = ',e);
    };

    // Sending String
    //connection.send('your message');

    //////////
    // socket = io("https://localhost:3000");
    //
    var logError = (error) => {
      console.log("logError", error);
    }

    var getLocalStream = () => {

        navigator.getUserMedia({ "audio": true,
          video: {
                mandatory: {
                  minWidth: 200, // Provide your own width, height and frame rate here
                  minHeight: 360,
                  maxWidth: 200, // Provide your own width, height and frame rate here
                  maxHeight: 360,
                  minFrameRate: 24
                } } }, function (stream) {
          localStream = stream;
          selfView.src = URL.createObjectURL(stream);
          selfView.muted = true;
        }, err=>{
          console.log("navigator.getUserMedia err = ",err);
        });
      }

    var exchange = (data) => {
      console.log("1. start on exchange data with mobile");
      var fromId = data.from;
      var pc;
      if (fromId in pcPeers) {
        console.log("2. check in pcPeers object, fromId = ",fromId);
        pc = pcPeers[fromId];
      } else {
        console.log("21. will create new PC");
        pc = createPC(fromId, false);
      }

      if (data.sdp) {
        console.log('24. exchange sdp', data);
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
          console.log('241. exchange sdp -> setRemoteDescription -> pc.remoteDescription.type = ',pc.remoteDescription.type);
          if (pc.remoteDescription.type == "offer")
            pc.createAnswer(function(desc) {
              console.log('242. createAnswer', desc);
              pc.setLocalDescription(desc, function () {
                console.log('243. setLocalDescription', pc.localDescription);
                //socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
                var sendData = {'to': 'ios',from:'web', 'sdp': pc.localDescription };
                console.log("244. -----------------------------------------> send websocket connection = ",sendData);
                connection.send(JSON.stringify(sendData));

              }, logError);
            }, logError);
        }, logError);
      } else {
        console.log('25. exchange candidate', data);
        pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    };

    var leave = (socketId) => {
      console.log('leave', socketId);
      var pc = pcPeers[socketId];
      pc.close();
      delete pcPeers[socketId];
      var video = document.getElementById("remoteView" + socketId);
      if (video) video.remove();
    };

    var createPC = (socketId, isOfferInit) => {
      var isOffer = isOfferInit;
      var pushData = [];
      console.log("3. *********** create PC with params = ",socketId, isOffer);
      var pc = new RTCPeerConnection(configuration);
      var delayPushNoti;
      pcPeers[socketId] = pc;

      function createOffer() {
        console.log("41. *** createOffer is running isOffer = ",isOffer);
        pc.createOffer(function(desc) {
          console.log('42. createOffer', desc);
          pc.setLocalDescription(desc, function () {
            console.log('43. setLocalDescription', pc.localDescription);
            //socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
            var sendData = {'to': 'ios',from:'web', 'sdp': pc.localDescription };
            //pushData.push(sendData);

            // console.log("push at SDP......................");
            // var compressedString = lz.compress(JSON.stringify(sendData));
            // console.log("compressedString = ",compressedString);
            // var decompressedString = lz.decompress(compressedString);
            // console.log("decompressedString = ",decompressedString);
            if(isOffer){
              pushData.push(sendData);
            }else {
              console.log("44. ------------------------------------> send websocket connection = ",sendData);
              connection.send(JSON.stringify(sendData));
            }
          }, logError);
        }, logError);
      }

      pc.onnegotiationneeded = function () {
        console.log('4. onnegotiationneeded    isOffer = ', isOffer);
        if (isOffer) {
          createOffer();
        }
      }

      pc.onicecandidate = function (event) {
        console.log('5. onicecandidate', event);
        if (event.candidate) {
          //socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
          clearTimeout(delayPushNoti);
          var sendData = {'to': 'ios',from:'web','candidate': event.candidate };
          if(isOffer){
            pushData.push(sendData);
            //will call push noti api after 1 second. Purpose: wait for collecting
            delayPushNoti = setTimeout(()=>{
              console.log("51. -----------------------------------> push notification on cadidate ");
              isOffer = false;
              that.props.pushACall(that.state.value,JSON.stringify(pushData));
            },1000);
          }else {
            console.log("52. -----------------------------------> send websocket connection = ",sendData);
            connection.send(JSON.stringify(sendData));
          }
        }else{
          //will call api to push notification
          if(isOffer){
            console.log("53. -----------------------------------> push notification = ");
            isOffer = false;
            that.props.pushACall(that.state.value,JSON.stringify(pushData));
          }
        }
      };





      pc.oniceconnectionstatechange = function(event) {
        console.log('8. oniceconnectionstatechange', event);
        if (event.target.iceConnectionState === 'connected') {
          createDataChannel();
        }
      };

      pc.onsignalingstatechange = function(event) {
        console.log('9. onsignalingstatechange', event);
      };

      pc.onaddstream = function (event) {
        console.log('10. ======================================================> onaddstream', event);
        remoteStream = URL.createObjectURL(event.stream);
        console.log('10. ======================================================> remoteStream', remoteStream);
        remoteView.src = remoteStream;
      };

      pc.addStream(localStream);

      function createDataChannel() {
        console.log("11. createDataChannel");
        if (pc.textDataChannel) {
          return;
        }
        var dataChannel = pc.createDataChannel("text");
        dataChannel.onerror = function (error) {
          console.log("11. dataChannel.onerror", error);
        };
        dataChannel.onmessage = function (event) {
          console.log("12. dataChannel.onmessage:", event.data);
          var content = document.getElementById('textRoomContent');
          content.innerHTML = content.innerHTML + '<p>' + socketId + ': ' + event.data + '</p>';
        };
        dataChannel.onopen = function () {
          console.log('13. dataChannel.onopen');
          var textRoom = document.getElementById('textRoom');
          //textRoom.style.display = "block";
        };
        dataChannel.onclose = function () {
          console.log("14. dataChannel.onclose");
        };
        pc.textDataChannel = dataChannel;
      }

      return pc;
    };



    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    createPC2 = createPC;

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


  _submit(){
    createPC2("ios", true);
    // console.log('submit company detail',this.state);
    // socket.emit('join', this.state.value, function(socketIds){
    //   console.log('join', socketIds);
    //   for (var i in socketIds) {
    //     var socketId = socketIds[i];
    //     createPC2(socketId, true);
    //   }
    // });
  }


  // join(roomID) {
  //   socket.emit('join', roomID, function(socketIds){
  //     console.log('join', socketIds);
  //     for (var i in socketIds) {
  //       var socketId = socketIds[i];
  //       this.createPC(socketId, true);
  //     }
  //   });
  // }



  render() {

    return (
      (
        <div>
          <label>
           Name:<input type="text" value={this.state.value} onChange={this.handleChange} />
         </label>
         <button onClick={this._submit.bind(this)}>Join</button>
          Doing...
          <video id="selfView" autoPlay>

          </video>
          <video id="remoteView" autoPlay>

          </video>
        </div>
      )
    );
  }
}

function bindAction(dispatch) {
  return {
    pushACall: (userId,data) => dispatch(pushACall(userId,data)),
  };
}

function mapStateToProps(state){
	return state;
}

export default connect(null,bindAction)(WebRTC);
