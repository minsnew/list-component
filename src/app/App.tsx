import React from 'react';
import ListView from '../components/listView/listView';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <ListView></ListView>
      </div>
    );
  }
}

export default App;
