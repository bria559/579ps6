import React from 'react';
import ReactDOM from 'react-dom';
import RhymeFunc from './RhymeFunc';


ReactDOM.render(
    <>
      <div className="container">
        <div>
          <a href="https://bria559.github.com/579ps6/">
            Code
          </a>
        </div>
        <RhymeFunc />
      </div>
    </>,
    document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// ReactDOM.render(<><h1>React To Do</h1></>, document.getElementById('root'));
// ReactDOM.render(<><h1>Rhyme Finder</h1><rhymeFunc /></>, document.getElementById('root'));

