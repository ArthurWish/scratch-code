import React, { Component } from 'react';
import AudioBlock from '../components/AudioBlock';
import CodeBlock from '../components/CodeBlock';
import LinkAudioCode from '../components/LinkAudioCode';
import LinkAudioEnd from '../components/LinkAudioEnd';
import LinkCodeEnd from '../components/LinkCodeEnd';
import style from '../codehelp.css'
import { connect } from 'react-redux';
import {changeStateRecord} from '../reducers/codehelp.js'
class HelpBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderComponents:<AudioBlock id={this.props.id} />,
      stateRecords: []

    };
    this.blockid = this.props.id;
  }
  hanldeRecordUpdate= (record) => {
    const oldrecord = this.props.state_recorder
    const newrecord = [...oldrecord,record]
    // console.log(newrecord)
    this.props.onChangeRecord(newrecord);
   
  }
  hanldeRecordLoad= (id) => {

    const oldrecord = this.props.state_recorder[id]
    console.log(oldrecord)
    if (oldrecord.length===2){
      return (
        <>
          <AudioBlock id={this.blockid} />
          <LinkAudioCode />
          <CodeBlock id={this.blockid} />
          <LinkCodeEnd />
        </>
      );
    }else if(oldrecord.length ===1){
      return (
        <>
          <AudioBlock id={this.blockid} />
          <LinkAudioEnd />
        </>
      );
    }
   
  }
  componentDidUpdate(prevProps,prevState) {
    if (this.blockid == (this.props.num_question - 1) && prevProps.help_step !== this.props.help_step) {
      let renderComponents = null;
      this.setState({
        stateRecords: [...prevState.stateRecords, this.props.help_step]
      });
      if (prevProps.help_step === 'audio_feedback' && this.props.help_step === 'code_feedback') {
        renderComponents = (
          <>
            <AudioBlock id={this.blockid} />
            <LinkAudioCode />
            <CodeBlock id={this.blockid}/>
          </>
        );
      }
      if (prevProps.help_step === 'audio_feedback' && this.props.help_step === 'done_help') {
        renderComponents = (
          <>
            <AudioBlock id={this.blockid} />
            <LinkAudioEnd />
          </>
        );
      }
      if (prevProps.help_step === 'code_feedback' && this.props.help_step === 'done_help') {
        renderComponents = (
          <>
            <AudioBlock id={this.blockid} />
            <LinkAudioCode />
            <CodeBlock id={this.blockid}/>
            <LinkCodeEnd />
          </>
        );
      }
      if(this.props.help_step === 'done_help'){
        // console.log([...prevState.stateRecords, this.props.help_step])
        this.hanldeRecordUpdate([...prevState.stateRecords, this.props.help_step])
      }
      
      
      this.setState({ renderComponents });
    }

  }

  render() {
    let renderComponents;
    
    if(this.blockid < (this.props.num_question - 1)){
      renderComponents = this.hanldeRecordLoad(this.blockid)

    }else{
      renderComponents = this.state.renderComponents
    }
    
    return(
       <div className={style.helpblock}>
          {renderComponents}
       </div>
     )
  }
}


const mapStateToProps = (state) => {
  return {
    num_question : state.num_question,
    help_step: state.help_step,
    state_recorder: state.state_recorder
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onChangeRecord: (record) => {
      dispatch(changeStateRecord(record));
    },
  
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HelpBlock);