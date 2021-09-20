import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import JobCards from "./JobCards";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  companieslength: state.companies.company.length,
})

function SearchPage(props) {
  return (
    <Card className="containerborder">
      <div className="position-relative">
      <h1 className="mt-3">Jobs Search Engine</h1>
      <Link to="/favourites">
      <Button className="favouritecompanybutton" >Favourite Companies{" "}({props.companieslength})</Button>
      </Link>
      </div>
      <hr style={{ backgroundColor:"black" }}/>
      <h3 className="mt-2">Search for a job:</h3>
      <Container className="d-flex">
        <JobCards></JobCards>
      </Container>
      </Card>  
  );
}

export default connect(mapStateToProps)(SearchPage);
