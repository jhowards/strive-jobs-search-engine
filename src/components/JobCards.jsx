import React from "react";
import SingleJob from "./SingleJob";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchArrayAction, backButtonAction } from "../actions";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  searchArray: (search) => dispatch(searchArrayAction(search)),
  fetchArray: () => dispatch(searchArrayAction()),
  backButton: () => dispatch(backButtonAction(false)),
});

function JobCards({ fetchArray, search, searchArray, backButton }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [jobsArray, setJobsArray] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery === "") {
      alert("Please input a job title!");
    } else {
      setisLoading(true);
      await searchArray(searchQuery);
      setisLoading(false);
    }
  };

  // const getArray = async () => {
  //   setisLoading(true);
  //   try {
  //     let response = await fetch(
  //       `https://strive-jobs-api.herokuapp.com/jobs?search=${searchQuery}`
  //     );
  //     let jobsresponse = await response.json();
  //     if (jobsresponse.length === 0) {
  //       alert("No jobs found with this title!");
  //     }
  //     setJobsArray(jobsresponse.data);
  //     console.log(jobsArray);
  //     setisLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setisLoading(false);
  //   }
  // };

  useEffect(() => {
    if (search.backbutton === false) {
      fetchArray();
    } else {
    }
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Row>
            <Col>
              <Form id="searchQueryForm" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicSearch" className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Job Title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mr-3"
                    size="lg"
                  />
                  <Button type="submit" size="lg" variant="primary">
                    Search
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="d-flex">
            {isLoading ? (
              <Spinner
                variant="success"
                animation="border"
                role="status"
                className="mx-auto mt-5"
              ></Spinner>
            ) : (
              search.searchresults.map((b) => (
                <Col xs={3} key={b._id}>
                  <SingleJob job={b} id={b._id} />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCards);
