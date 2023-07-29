import React, { Component } from 'react';
import style from '../codehelp.css'
import LogoImg from '../assets/logoimage.png'
import LogoText from '../assets/logotext.png'

export default class AppLogo extends Component {


  render() {
    return(
      <div className={style.logocontainer}>
        <img src={LogoImg} alt="Logo Image" />
        <img src={LogoText} alt="Logo Text" />
      </div>
    )
  }
}
