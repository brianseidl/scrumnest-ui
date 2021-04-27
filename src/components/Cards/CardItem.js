import React from "react";

const CardItem = ({ cardItem, onClicked }) => {
  return (
    <React.Fragment>
      <div className="card h-100">
        <img
          className="card-img-top p-2"
          src={cardItem.imgSrc}
          alt={cardItem.alt}
          height="200"
          width="200"
        />
        <div className="card-body">
          <h4 className="card-title">{cardItem.title}</h4>
          <p className="card-text">{cardItem.body}</p>
        </div>
        <div className="card-footer">
          <a
            href={cardItem.buttonRoute}
            onClick={() => onClicked(cardItem.route)}
            className="btn btn-primary"
          >
            {cardItem.buttonText}
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardItem;
