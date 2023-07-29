//action type
const Count_Question = 'Count_Question'
const Move_Step = 'Move_Step'
const Record_State = 'Record_State'
const Record_QuestionAudio = 'Record_QuestionAudio'
const Record_AnswerAudio = 'Record_AnswerAudio'
const Play_Audio = 'Play_Audio';
const Stop_Audio = 'Stop_Audio';


//reducer

//help_step : audio_feedback, code_feedback, done_help
//question_audio :const blob = new Blob(this.chunks, { 'type' : 'audio/webm' });
//answer_audio: base64.b64encode(f.read()).decode('utf-8')
export default function(state,action){

  if (!state){
    state = {...state, num_question:0, help_step:'done_help', state_recorder:[],question_audio:[], answer_audio:[],currentPlayingAudio: null }
  }

  switch(action.type){
    case Count_Question:
      return {...state, num_question:action.num};
    case Move_Step:
      return {...state, help_step:action.step};
    case Record_State:
      return {...state, state_recorder:action.record};
    case Record_QuestionAudio:
      return {...state, question_audio:action.qaudio};
    case Record_AnswerAudio:
      return {...state, answer_audio:action.aaudio};
    case Play_Audio:
      return {...state, currentPlayingAudio: action.audio};
    case Stop_Audio:
      return {...state, currentPlayingAudio: null};

      default:
        return state;
  }
};


//action creators


export const changeQuestionNum = (num) =>{
  return {type:Count_Question, num}
}


export const changeHelpStep = (step) =>{
  return {type:Move_Step, step}
}

export const changeStateRecord = (record) =>{
  return {type:Record_State, record}
}

export const changeQuestionAudioRecord = (qaudio) =>{
  return {type:Record_QuestionAudio, qaudio}
}

export const changeAnswerAudioRecord = (aaudio) =>{
  return {type:Record_AnswerAudio, aaudio}
}


export const playAudio = (audio) => {
  return {type: Play_Audio, audio}
}

export const stopAudio = () => {
  return {type: Stop_Audio}
}




