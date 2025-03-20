import React, { useState } from 'react';
import { Card, Container, Row, Col, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function CountryCards({ countries }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // You can adjust this number

  const handleCardClick = (name) => {
    navigate(`/country/${name}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = countries.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!countries || countries.length === 0) {
    return <div>No countries found.</div>;
  }

  return (
    <Container>
      <h3 className="text-center mb-4">Please click a country card to see more details</h3>
      <Row>
        {currentItems.map((country) => (
          <Col xs={12} md={4} lg={3} key={country.name.common} className="mb-4">
            <Card onClick={() => handleCardClick(country.name.common)} className="clickable-card">
              <Card.Img variant="top" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
              <Card.Body>
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Text>
                  Capital: {country.capital?.[0] || "N/A"}
                  <br />
                  Region: {country.region}
                  <br />
                  <small>Click to see details</small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center mt-4" >
        {Array.from({ length: Math.ceil(countries.length / itemsPerPage) }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}

export default CountryCards;