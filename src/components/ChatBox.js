//Libs
import React, { Component } from 'react'
var moment = require('moment');

//WebSocket
import socket from '../socket';

//Material UI
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

//CSS
const compStyle={
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
}

const userStyle={
  backgroundColor: "#80DEEA",
  margin: "0.5em 0 0.5em 1em",
  padding: "0.5em",
  width: "75%"
}

const appStyle={
  alignSelf: "flex-end",
  backgroundColor: "#E0E0E0",
  margin: "0.5em 1em 0.5em 0",
  padding: "0.5em",
  textAlign: "right",
  width: "75%"
}

const chatBoxLimitStyle={
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
  overflow: "auto"
}

const timestampStyle={
  fontSize: "0.65em",
  margin: "0.5em",
  verticalAlign:"bottom"
}

const fontIconStyle = {
  fontSize: "1.50em",
  verticalAlign:"middle"
}

//Main Component
class ChatBox extends Component {
  sendChatResponse(e){
    e.preventDefault();
    let val = this.refs.inputField.input.value
    socket.emit(
      'send_human_message',
      {
        user_id: this.props.conversation.user_id,
        message: val
      }
    );
    this.refs.inputField.input.value = "";
    console.log("chat response " + val);
  }

  scrollToBottom = () => {
    let anchor = this.refs.anchor
    anchor.scrollIntoView({block:"end", behavior: "smooth"})
  }

  componentDidUpdate () {
    this.scrollToBottom();
  }

  render(){
    const messages = this.props.conversation.messages;
    const convItem = messages.map(function(message, idx){
      if(message.sender === 'app'){
        let messageTime = message.time
        return (
          <Paper style={appStyle} zDepth={1} key={idx} >
            <div>
              <span style={{marginTop: "0"}}>{message.message}</span><br/>
              <span style={timestampStyle} >
                <FontIcon className="material-icons" style={fontIconStyle}>
                  timer
                </FontIcon>
                {moment(messageTime).fromNow()}
              </span>
            </div>
          </Paper>
        )
      } else {
        let messageTime = message.time
        return (
          <Paper style={userStyle} zDepth={1} key={idx} >
            <div>
              <span style={{marginTop: "0"}} >{message.message}</span><br/>
              <span style={timestampStyle} >
                <FontIcon className="material-icons" style={fontIconStyle}>
                  timer
                </FontIcon>
                {moment(messageTime).fromNow()}
              </span>
            </div>
          </Paper>
        )
      }
    })

    return(
      <div style={compStyle}>
        <div
          style={{
            backgroundColor: "#00bcd4",
            fontSize: "14px",
            padding: "1em",
            flex: "0",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          <FontIcon className="material-icons" style={{color: "rgba(255,255,255, 0.7)"}}>
            forum
          </FontIcon>
        </div>

        <div style={chatBoxLimitStyle}>
          {convItem}
          <div ref="anchor"></div>
        </div>


        <Divider />
        <div style={{flex:"0"}}>
          <form onSubmit={this.sendChatResponse.bind(this)}>
            <TextField
              hintText="Type question here"
              fullWidth={true}
              id="inputField"
              ref="inputField"
              style={{padding: "0 8px"}}
              underlineStyle={{display: "none"}}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default ChatBox;
