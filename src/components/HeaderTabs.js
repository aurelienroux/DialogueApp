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
import logoDialogue from '../images/logoDialogue.png'

//CSS
const compStyle={
  display:"flex",
  flexDirection: "column",
  flexGrow: "1",
}

const titleStyle = {
  color: "#00bcd4",
  fontWeight: "900",
  fontSize: "2em",
  textAlign: "center"
}

const tabsStyle = {
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
}

const imgStyle = {
  height: '1em',
  verticalAlign: 'middle'
}

//Main Component
class headerTabs extends Component {
  render(){
    return(
      <div style={compStyle}>
        <h1 style={titleStyle}>
          <img src={logoDialogue} alt="logo" style={imgStyle}/>
          <span style={{verticalAlign: 'middle'}}>Dialogue NurseBot</span>
        </h1>
        <MuiThemeProvider>
          {
            this.props.conversations.length > 0 ?
            <Tabs
              style={tabsStyle}
              // tabItemContainerStyle= {{display:"flex", flex:"1", border:"2px dashed blue"}}
              // tabTemplateStyle= {{display:"flex", border:"2px dotted red", flex:"1"}}
              // contentContainerStyle= {{display:"flex", flexDirection:"column", flex:"1", border:"2px solid green"}}
            >
              {this.props.conversations.map(conv => {
                if(conv.state.needsHuman === true){
                  return (
                    <Tab
                      label={
                        <FontIcon color={'red'} className="material-icons">face</FontIcon>
                      }
                      key={conv.user_id}
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
              })}
            </Tabs>
            :
            null
          }
                  </MuiThemeProvider>
      </div>
    )
  }
}

export default headerTabs;
