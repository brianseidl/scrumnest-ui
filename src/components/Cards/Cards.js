import React, { Component } from 'react';
import CardItem from './CardItem';

class Cards extends Component {
  state = {  }
  
  render() { 
    return ( 
      <React.Fragment>
        <div className="row">
          {this.props.cards.map((cardItem) => (
            <div key={cardItem.title} className="col-md-4 mb-5">
              <CardItem cardItem={cardItem} onClicked={this.handleClicked}/>      
            </div>
          ))}
        </div>
      </React.Fragment>
     );
  }

  handleClicked = (cardItem) => {
    // TO-DO: Support handleClicked event for cards
  }
}
 
export default Cards;