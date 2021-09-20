import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromFavouritesAction, backButtonAction } from "../actions";

const mapStateToProps = (state) => ({
  companies: state.companies.company,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromFavourites: (index) => dispatch(removeFromFavouritesAction(index)),
  backButton: () => dispatch(backButtonAction(true)),
});

function FavouriteCompanies(props) {
  return (
    <Card className="containerborder">
      <div className="position-relative">
        <h1 className="mt-3">Jobs Search Engine</h1>
        <Link
          onClick={() => {
            props.backButton();
          }}
          to="/search"
        >
          <Button className="backbutton">Back</Button>
        </Link>
      </div>
      <hr style={{ backgroundColor: "black" }} />
      <h3 className="mt-2">Favourite Companies:</h3>
      <ListGroup className="w-50 mx-auto favcompanylist">
        {props.companies.map((company, i) => (
          <div className="position-relative">
            <ListGroup.Item key={i}>
              <Link to={"company-detail/" + company}>{company}</Link>
            </ListGroup.Item>

            <Button
              onClick={() => props.removeFromFavourites(i)}
              variant="danger"
              size="sm"
              className="removebutton"
            >
              Remove
            </Button>
          </div>
        ))}
      </ListGroup>
    </Card>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCompanies);
