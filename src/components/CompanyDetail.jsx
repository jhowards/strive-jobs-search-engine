import React from "react";
import { Card, Col, Spinner, Container, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToFavouritesAction, backButtonAction } from "../actions";

const mapStateToProps = (state) => ({
  companieslength: state.companies.company.length,
  companies: state.companies.company,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavourites: (companyToAdd) =>
    dispatch(addToFavouritesAction(companyToAdd)),
  backButton: () => dispatch(backButtonAction(true)),
});

function CompanyDetail(props) {
  const [jobsArray, setJobsArray] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const { company_name } = useParams();
  const [isFavourited, setisFavourited] = useState(false);
  const [justAdded, setjustAdded] = useState(false);

  const getArray = async () => {
    setisLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "frontend_lang=en_US; session_id=5d75b75446e5c72d6c95de28083b7079c90f8248"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      let response = await fetch(
        `https://strive-jobs-api.herokuapp.com/jobs?company=${company_name}`,
        requestOptions
      );
      let companyresponse = await response.json();
      setJobsArray(companyresponse.data);

      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  useEffect(() => {
    const result = props.companies.filter(
      (company) => company === company_name
    );
    if (result.length > 0) {
      console.log("matching!");
      setisFavourited(true);
    } else {
      console.log("not matching!");
      setisFavourited(false);
    }
    setCompanyName(company_name);
    getArray();
    // if (typeof jobsArray[0].company_logo_url !== "undefined") {
    //   setisCompanyLogo(true);
    // }
  }, []);

  // const tempAlert = () =>{
  //   setjustAdded(true);
  // }

  return (
    <Card className="containerborder">
      <div className="position-relative">
        <h1 className="mt-3">Jobs Search Engine</h1>
        <Link to="/favourites">
          <Button className="favouritecompanybutton">
            Favourite Companies ({props.companieslength})
          </Button>
        </Link>
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
      <h2 className="mt-2">{company_name}</h2>
      <div style={{ height: "25px" }}>
        {isFavourited ? (
          ""
        ) : (
          <Button
            size="sm"
            className="mx-auto"
            onClick={() => {
              props.addToFavourites(companyName);
              setTimeout(() => {
                setjustAdded(false);
              }, 1500);
              setjustAdded(true);
              setisFavourited(true);
            }}
          >
            Favourite
          </Button>
        )}
        {justAdded ? (
          <Alert className="mb-0 py-2 w-50 mx-auto" variant="success">
            {companyName} added to favourites!
          </Alert>
        ) : (
          ""
        )}
      </div>

      <h4 className="mt-5 mb-3">Jobs Available:</h4>
      {isLoading ? (
        <Spinner
          variant="success"
          animation="border"
          role="status"
          className="mx-auto mt-5"
        ></Spinner>
      ) : (
        <Container className="jobcard" style={{ width: "35vw" }}>
          {jobsArray.map((b) => (
            <Col xs={12} key={b._id}>
              <Card
                className="m-2 jobCard"
                style={{
                  border: "3px solid black",
                }}
              >
                <Card.Body className="d-flex">
                  <Card.Title
                    className="m-auto"
                    style={{ color: "black", fontSize: "16px" }}
                  >
                    <h5 className="mb-0">{b.title}</h5>
                    <small className="mb-2 mt-0">{b.category}</small>
                    <p className="mt-2">{b.candidate_required_location}</p>
                    <p className="mt-2 mb-0">
                      Published: {b.publication_date.substring(0, 10)}
                    </p>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Container>
      )}
    </Card>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail);
