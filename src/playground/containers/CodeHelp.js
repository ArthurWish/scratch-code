import React, { Component } from 'react';
import AppLogo from '../components/AppLogo';
import ItemContainer from './ItemContainer';
import VoiceButton from '../components/VoiceButton';
import style from '../codehelp.css'

export default class CodeHelp extends Component {
  

  render() {
     return(
      <div className={style.codehelp}>
        <AppLogo/>
        <ItemContainer/>
        <VoiceButton/>
      </div>
     )
  }
}
