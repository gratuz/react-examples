import React, { Component } from 'react';
import { connect } from 'react-redux'

import {ActionFetchCards} from './CardData';
import {Card} from '@scotia/canvas-react';



const mapStateToProps = state => {
  return {
    items: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestData: url => {
      dispatch(ActionFetchCards(url));
    }
  }
}



class _Cards extends Component{

  constructor(args){
    super();
    this.requestData = args.requestData;
  }

  //just loading reddit data because the redux example was
  sourceUrl(){
      return `https://www.reddit.com/r/javascript.json`;
  }

  hasItems(){
    if(typeof this.props.items === "undefined") return false;
    else return this.props.items.length > 0;
  }

  componentDidMount() {
    this.requestData(this.sourceUrl());
  }

  renderLoading(){
    return(<Card className="row">Loading...</Card>)
  }

  renderItems(){
    return this.props.items.map((item,index) =>
      <Card className="row" key={index}>{item.data.title}</Card>
    );
  }

  render(){
    return(
      <div>
        {this.hasItems() === true ? this.renderItems() : this.renderLoading()}
      </div>
    )
  }

}



const Cards = connect(
    mapStateToProps,
    mapDispatchToProps
  )(_Cards)
  
export default Cards;