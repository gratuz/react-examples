import React, { Component } from 'react';
import { Provider } from 'react-redux'

import '@scotia/canvas-dom/css/index.css';
import { Header} from '@scotia/canvas-react';

import { CreateCardDataStore} from './cards/CardData';
import Cards from './cards/Cards';


import './app.css';



class App extends Component {
  render() {
    return (
      <Provider store={CreateCardDataStore()}>
        <div>
          <Header />
          <div className="layout-row">
            <Cards />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
