import React, { Component, createRef } from 'react';
import HelpBlock from './HelpBlock';
import style from '../codehelp.css';
import { connect } from 'react-redux';

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
    this.data=null
  }

  
  componentDidMount() {
    // 在组件挂载后添加事件监听器
    window.addEventListener("message", this.receiveMessage, false);
  }

  componentWillUnmount() {
      // 在组件卸载前移除事件监听器
      window.removeEventListener("message", this.receiveMessage, false);
  }
  receiveMessage = (event) => {
    // 检查消息的来源
    if (event.origin !== "http://localhost:3000") return;

    // 接收并处理消息
    this.data = event.data;
    // console.log(data.role_urls, data.scene_urls);
  }

  componentDidUpdate() {
    const scrollHeight = this.myRef.current.scrollHeight;
    const height = this.myRef.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.myRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const num_block = this.props.num_question;
    console.log(this.data)
    return (
      <div className={style.itemcontainer} ref={this.myRef}>
        {Array.from({ length: num_block }, (_, index) => <HelpBlock key={index} id={index} />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    num_question : state.num_question
    
  };
};

export default connect(mapStateToProps)(ItemContainer);
