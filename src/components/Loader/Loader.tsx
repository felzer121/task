import React from 'react';
import './style.scss'

const Loader = () => {
  return (
    <div id='Loader'>
      <h1>Loading</h1>
      <div id="cooking">
        <div className="bubble"/>
        <div className="bubble"/>
        <div className="bubble"/>
        <div className="bubble"/>
        <div className="bubble"/>
        <div id="area">
          <div id="sides">
            <div id="pan"/>
            <div id="handle"/>
          </div>
          <div id="pancake">
            <div id="pastry"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;