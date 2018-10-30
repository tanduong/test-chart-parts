import React, {Component} from 'react';
import './App.css';
import BarChart from './components/BarChart';
import AnotherBarChart from './components/AnotherBarChart';
class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>Chart 1</h3>
        <BarChart />
        <h3>Chart 2</h3>
        <AnotherBarChart />
      </div>
    );
  }
}

export default App;
