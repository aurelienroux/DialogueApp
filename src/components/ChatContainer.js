//Libs
import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

//CSS
const style={
  backgroundColor: "lightgrey",
  display: "flex",
  flexDirection: "row",
  padding: "1vw",
}

const childStyle={
  flex: "1",
  margin: "1vw",
}

//Import Components
import ChatBox from './ChatBox'
import GeneralForm from './GeneralForm'

//Main Component
class ChatContainer extends Component {
  render(){
    return(
      <div id="chatContainer" style={style} >
        <Paper
          children={ <ChatBox conversation={this.props.conversation} /> }
          className="chatContainerChild"
          style={childStyle}
        />
        <Paper
          children={ <GeneralForm conversation={this.props.conversation} /> }
          className="chatContainerChild"
          style={childStyle}
        />
      </div>
    )
  }
}

export default ChatContainer
