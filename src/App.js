import React, {Component} from 'react';
import './App.css';
import BarChart from './components/BarChart';
import AnotherBarChart from './components/AnotherBarChart';
import AnotherOne from './components/AnotherOne';
class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>Chart 1</h3>
        <BarChart />
        <h3>Chart 2</h3>
        <AnotherBarChart />
        <h3>Chart 3</h3>
        <AnotherOne />
      </div>
    );
  }
}

export default App;
