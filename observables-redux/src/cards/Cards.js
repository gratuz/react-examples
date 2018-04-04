import React, { Component } from 'react';
import { connect } from 'react-redux'

import {ActionFetchCards} from './CardData';
import {Card} from '@shopify/polaris';



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
      <Card key={index} title={item.data.title}>
        <Card.Section>
          <p>{item.data.selftext}</p>
        </Card.Section>
        <Card.Section>
          <p><a href={item.data.url} target="_blank">{item.data.permalink}</a></p>
        </Card.Section>
      </Card>
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