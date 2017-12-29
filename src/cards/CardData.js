import React, { Component } from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'

import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs';




/**
 * These can be seperated into individual files, but leaving in one file to
 * simplify logical relationship
 */

 //Actions 
export const ActionFetchCards = value => {
    return{
        type: 'FETCH_CARDS',
        url: value
    }
}

export const ActionDisplayCards = value => {
    return{
        type: 'DISPLAY_CARDS',
        data: value
    }
}



//Epics 
//Epics are the "function" that helps associate action objects to asynchronous calls
//https://redux-observable.js.org/docs/basics/Epics.html
export const cardEpic = action$ => action$.ofType('FETCH_CARDS').
                            mergeMap(action => DataService.FetchData(action.url).
                                map(response => ActionDisplayCards(response.data.children)));


//Service class for fetching data 
//this can be (almost) anything, but just needs to wrap the return type
//in an Observable using Observable.from http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-from
const DataService = {

    FetchData(url) {
        let f = fetch(url)
        .then((response)=>{
             return response.json();
        });

        return Observable.from(f);
    }
}

//Only DISPLAY_CARDS action is implemented.
//The FETCH_CARDS action is caught and handled by the epic, which on completion
//triggers a DISPLAY_CARDS action.
//We can still have a reducer here (for example to update waiting state) as the FETCH_CARDS
//action will continue to propagate and reach the reducer no matter what the epic is
//doing with it
export const CardReducer = (state = [], action) => {
    switch (action.type) {
      case 'DISPLAY_CARDS':
        return Object.assign([], state,action.data);
      default:
        return state
    }
  }
  

//Wrapping the store creation to make it simpler
//we need to "applyMiddleware" (https://redux.js.org/docs/api/applyMiddleware.html)
//By default we can only have simple objects as actions. To have functions we
//use the thunkMiddleware (https://github.com/gaearon/redux-thunk), and in order
//to use epics and obersvables we use 'createEpicMiddleware' (https://github.com/redux-observable/redux-observable/blob/master/docs/api/createEpicMiddleware.md)
export const CreateCardDataStore = () => {
    return createStore(CardReducer,applyMiddleware(createEpicMiddleware(cardEpic),thunkMiddleware));
}

