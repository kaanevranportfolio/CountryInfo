import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchBar({
  nameSearchTerm,
  setNameSearchTerm,
  handleNameSearch,
  regionSearchTerm,
  setRegionSearchTerm,
  handleRegionSearch,
}) {
  const navigate = useNavigate();

  const handleNameSearchWithNavigate = async () => {
    await handleNameSearch();
    navigate('/');
  };

  const handleRegionSearchWithNavigate = async () => {
    await handleRegionSearch();
    navigate('/');
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form.Group controlId="nameSearch">
            <Form.Control
              type="text"
              placeholder="Enter country name"
              value={nameSearchTerm}
              onChange={e => setNameSearchTerm(e.target.value)}
              className="mb-2"
            />
            <Button variant="primary" onClick={handleNameSearchWithNavigate} block>
              Search by Name
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form.Group controlId="regionSearch">
            <Form.Control
              type="text"
              placeholder="Enter region"
              value={regionSearchTerm}
              onChange={e => setRegionSearchTerm(e.target.value)}
              className="mb-2"
            />
            <Button variant="primary" onClick={handleRegionSearchWithNavigate} block>
              Search by Region
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchBar;