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

//Main Component
class headerTabs extends Component {
  render(){
    return(
      <div >
        <h1
          style={{
            fontWeight: "900",
            fontSize: "3em",
            textAlign: "center",
            textTransform: "uppercase",
            color: "#00bcd4",
            margin: "20px"
          }}
        >Conversation</h1>
        <MuiThemeProvider>
          <Tabs>
            {
              this.props.conversations.map(conv => (
                <Tab
                  label={conv.id}
                  icon={<FontIcon className="material-icons">face</FontIcon>}
                key={conv.user_id}>
                  <ChatContainer conversation={conv} />
                </Tab>
              ))
            }
          </Tabs>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default headerTabs;
