import React, { Component } from 'react';
import style from '../codehelp.css'


export default class LinkAudioEnd extends Component {
  

  render() {
  
    return (
      <div  style={{ height: "60%" }}>
        <svg height="100%" width="100%">
          <line  className={style.blockdivider} x1="40%" y1="0" x2="40%" y2="80%" />
          <circle className={style.blockdividerEnd} cx="40%" cy="80%" r="5" />
        </svg>
      </div>
    );
  }
  
  
  
}
