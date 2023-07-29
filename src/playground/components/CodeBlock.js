import React, { Component } from 'react';
import style from '../codehelp.css'
import CodePlay from '../assets/codeblock.png'
import { generateBlock, readDataFromJsonFile } from './block-generate.js';

// 获取页面大小
const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
console.log("pageWidth", pageWidth)
console.log("pageHeight", pageHeight)

const relativeX = pageWidth * 0.6
const abs_y = pageHeight * 0.3
const relativeY = pageHeight * 0.05
export default class CodeBlock extends Component {
  
  handleClick = async () => {
    try {
      // const fileContent = await readLinesFromFile();
      // const lines = fileContent.split("\n");
      let lines = await readDataFromJsonFile('http://localhost:5000/static/codes/block_suggestion.json', this.props.id.toString());
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        console.log('line:', line)
        await generateBlock(line, relativeX, (abs_y + i * relativeY));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    

     return(
      
      <div className={style.codecontainer}>
        <img src={CodePlay} alt="code play" onClick={this.handleClick}/>
     </div>  
     )
  }
}


