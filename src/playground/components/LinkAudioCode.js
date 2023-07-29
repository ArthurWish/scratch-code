import React, { Component } from 'react';
import style from '../codehelp.css'


export default class LinkAudioCode extends Component {
  

  render() {
  
    return (
      <div  style={{ height: "10%" }}>
        <svg height="100%" width="100%">
          <line  className={style.blockdivider} x1="50%" y1="0" x2="75%" y2="80%" />
          <circle className={style.blockdividerEnd} cx="78%" cy="90%" r="5" />
        </svg>
      </div>
    );
  }
  
  
  
}
