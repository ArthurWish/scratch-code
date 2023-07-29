import React, { Component } from 'react';
import style from '../codehelp.css'


export default class LinkCodeEnd extends Component {
  

  render() {
  
    return (
      <div  style={{ height: "15%" }}>
        <svg height="100%" width="100%">
          <line  className={style.blockdivider} x1="75%" y1="0" x2="50%" y2="80%" />
          <circle className={style.blockdividerEnd} cx="50%" cy="78%" r="5" />
        </svg>
      </div>
    );
  }
  
  
  
}
