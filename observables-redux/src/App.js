import React, { Component } from 'react';
import { Provider } from 'react-redux'

import '@shopify/polaris/styles.css';

import { CreateCardDataStore} from './cards/CardData';
import Cards from './cards/Cards';


import './app.css';



class App extends Component {
  render() {
    return (
      <Provider store={CreateCardDataStore()}>
        <div>
          <div className="layout-row">
            <Cards />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
