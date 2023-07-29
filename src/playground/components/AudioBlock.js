import React, { Component } from 'react';
import style from '../codehelp.css'
import PlayAudio0 from '../assets/audioplay0.png'
import PlayAudio1 from '../assets/audioplay1.png'
import PlayAudio2 from '../assets/audioplay2.png'
import AnswerPlayWave0 from '../assets/answerplaywave0.png'
import AnswerPlayWave1 from '../assets/answerplaywave1.png'
import AnswerPlayWave2 from '../assets/answerplaywave2.png'
import { connect } from 'react-redux';
import ReactLoading from "react-loading";
import {playAudio,stopAudio} from '../reducers/codehelp.js'
class AudioBlock extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      questionAnimationStep: 2,
      answerAnimationStep: 2,
      answerLength: null,
      isPlaying: false,
    };

    this.question_number = this.props.id+1;

   
  }



  startQuestionAnimation = () => {
    this.setState({ questionAnimationStep: 0 });
    this.questionAnimationInterval = setInterval(() => {
      this.setState(prevState => ({
        questionAnimationStep: (prevState.questionAnimationStep + 1) % 3,
      }));
    }, 500); // Adjust this value to change the animation speed
  }

  startAnswerAnimation = () => {
    this.setState({ answerAnimationStep: 0 });
    this.answerAnimationInterval = setInterval(() => {
      this.setState(prevState => ({
        answerAnimationStep: (prevState.answerAnimationStep + 1) % 3,
      }));
    }, 500); // Adjust this value to change the animation speed
  }

  playQuestionAudio = () => {
    
    if (!this.props.currentPlayingAudio){
      const question_blob = this.props.question_audio[this.props.id]
      const url = URL.createObjectURL(question_blob)
      const audio = new Audio(url);
      
      audio.onended = () => {
        this.resetQuestionAnimation();
        this.props.onStop(); // 在音频结束后，调用 Redux action 停止音频
      };
    
      // 将 audio 对象存储到 Redux store
      this.props.onPlay(audio);
    
      audio.play();
    
      this.startQuestionAnimation();

    }
    
  }


  CalculateAnserLength= () => {

      const answer_blob = this.base64ToBlob(this.props.answer_audio[this.props.id], 'audio/mp3')
      const url = URL.createObjectURL(answer_blob)
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        this.setState({ answerLength: Math.round(audio.duration) });
      };

  }

  playAnswerAudio = () => {
    console.log(this.props.currentPlayingAudio)
    if (!this.props.currentPlayingAudio){
      const answer_blob = this.base64ToBlob(this.props.answer_audio[this.props.id], 'audio/mp3')
      const url = URL.createObjectURL(answer_blob)
      const audio = new Audio(url);
    
      audio.onended = () => {
        this.resetAnswerAnimation();
        this.props.onStop(); // 在音频结束后，调用 Redux action 停止音频
      };
      this.props.onPlay(audio);
      audio.play();
    
      this.startAnswerAnimation();
    }
  }

  
  resetQuestionAnimation = () => {
    clearInterval(this.questionAnimationInterval);
    this.setState({ questionAnimationStep: 2 });
  }
  
  resetAnswerAnimation = () => {
    clearInterval(this.answerAnimationInterval);
    this.setState({ answerAnimationStep: 2 });
  }
  base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}


  render() {
    const hasEnoughAudio = this.props.answer_audio.length > this.props.id;
    const questionAudioPlayImage  = [PlayAudio0, PlayAudio1, PlayAudio2][this.state.questionAnimationStep];
    const answerAudioPlayImage = [AnswerPlayWave0, AnswerPlayWave1, AnswerPlayWave2][this.state.answerAnimationStep];
   
    if(hasEnoughAudio && this.state.answerLength===null){
      this.CalculateAnserLength()
    }
    return (
      <div>
      <div className={style.audiocontainer}>
        <div className={style.audioplay}>
          <img src={questionAudioPlayImage} alt="audio play" onClick={this.playQuestionAudio} />
        </div>
        <div className={style.answerplay}>
          <p className={style.questiontitle}>Question {this.question_number} </p>
          {hasEnoughAudio ? (
            <div className={style.answerplaybox} onClick={this.playAnswerAudio}>
              <img className={style.answerwaveimage} src={answerAudioPlayImage} alt="audio play" />
              <p className={style.audionumber}>{this.state.answerLength} '' </p>
            </div>
          ) : (
            <div className={style.answerplaybox} >
              <ReactLoading type={"spin"} color={"blue"} height={30} width={30}  style={{ marginLeft: "20px" }}/>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  }
  
  
  
}

const mapStateToProps = (state) => {
  return {
    question_audio:state.question_audio,
    answer_audio:state.answer_audio,
    currentPlayingAudio:state.currentPlayingAudio,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlay: (audio) => {
      dispatch(playAudio(audio));
    },
    onStop: () => {
      dispatch(stopAudio());
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(AudioBlock);