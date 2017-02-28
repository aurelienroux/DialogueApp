//Libs
import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

//Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()
import FontIcon from 'material-ui/FontIcon';

//Import Components
import ChatContainer from './ChatContainer'

//CSS
const compStyle={
  display:"flex",
  flexDirection: "column",
  flexGrow: "1",
  border: "1px solid tomato"
}

const titleStyle = {
  fontWeight: "900",
  color: "#00bcd4",
  fontSize: "2em",
  margin: "20px",
  textAlign: "center",
  textTransform: "uppercase",
}

const tabsStyle={
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
}

const uniTabStyle={
}

//Main Component
class headerTabs extends Component {
  render(){
    return(
      <div style={compStyle}>
        <h1 style={titleStyle}>Conversation</h1>
        <MuiThemeProvider>
          <Tabs style={tabsStyle}>
            {
              this.props.conversations.map(conv => {
                if(conv.state.needsHuman == true){
                  return (
                    <Tab
                      label={<FontIcon color={'#00E676'} className="material-icons">face</FontIcon>}
                      key={conv.user_id}
                      style = {uniTabStyle}
                    >
                      <ChatContainer conversation={conv} />
                    </Tab>
                  )
                } else {
                  return (
                    <Tab
                      label={<FontIcon color={'#fff'} className="material-icons">face</FontIcon>}
                      key={conv.user_id}>
                      <ChatContainer conversation={conv} />
                    </Tab>
                  )
                }
              })
            }
          </Tabs>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default headerTabs;
