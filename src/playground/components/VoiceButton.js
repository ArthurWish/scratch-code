import React, { Component } from 'react';
import style from '../codehelp.css'
import Voice from '../assets/voicebutton.png'
import tempYes from '../assets/yes.png'
import tempNo from '../assets/no.png'
import { connect } from 'react-redux';
import {changeQuestionNum,changeHelpStep,changeQuestionAudioRecord,changeAnswerAudioRecord} from '../reducers/codehelp.js'

class VoiceButton extends Component {

  constructor(props) {
    super(props);
    this.mediaRecorder = null;
    this.chunks = [];
    
  }

  handleClick = () => {
    if(this.props.help_step=='done_help'){
      this.props.onChangeNum(this.props.num_question + 1);
      this.props.onChangeStep('audio_feedback')
    }
   
  }
  handleYesClick = () => {
    if(this.props.help_step === 'audio_feedback' || this.props.help_step === 'code_feedback') {
      this.props.onChangeStep('done_help');
    }
  }
  handleNoClick = () => {
    if(this.props.help_step === 'audio_feedback') {
      this.props.onChangeStep('code_feedback');
    }
  }

  handleMouseDown = () => {
    console.log('start');
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.mediaRecorder.ondataavailable = e => {
          this.chunks.push(e.data);
        }

        this.mediaRecorder.onstop = e => {
          const blob = new Blob(this.chunks, { 'type' : 'audio/webm' });
          const newQuestionAudioRecord = [...this.props.question_audio, blob]
          this.props.onChangeQuestionAudio(newQuestionAudioRecord);

          const id = this.props.num_question;
          var formData = new FormData();

          formData.append('file', blob, 'filename.webm'); 
          formData.append('id', id);
          
          fetch('http://127.0.0.1:5000/generate_code', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {  
              const answer_audio = data.file
              const newAnswerAudioRecord  = [...this.props.answer_audio, answer_audio]
              this.props.onChangeAnswerAudio(newAnswerAudioRecord)
            
            })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
      });
  }

  handleMouseUp = () => {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      console.log('end');
    }
    this.chunks = [];
    this.handleClick();
  }

  
  render() {
    return(
      <div className={style.voicebuttoncontainer}>
        <img className={style.tempbutton} src={tempNo} alt="No" onClick={this.handleNoClick}/>
        <img src={Voice} alt="Voice Button" 
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
        <img className={style.tempbutton} src={tempYes}  alt="Yes" onClick={this.handleYesClick} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    num_question : state.num_question,
    help_step: state.help_step,
    question_audio:state.question_audio,
    answer_audio:state.answer_audio
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeNum: (num) => {
      dispatch(changeQuestionNum(num));
    },
    onChangeStep: (step) => {
      dispatch(changeHelpStep(step))
    },
    onChangeQuestionAudio: (record) => {
      dispatch(changeQuestionAudioRecord(record))
    },
    onChangeAnswerAudio: (record) => {
      dispatch(changeAnswerAudioRecord(record))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoiceButton);
