import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function CountryCards({ countries }) {
  const navigate = useNavigate();

  const handleCardClick = (name) => {
    navigate(`/country/${name}`);
  };

  if (!countries || countries.length === 0) {
    return <div>No countries found.</div>;
  }

  return (
    <Container>
      <h3 className="text-center mb-4">Please click a country card to see more details</h3>
      <Row>
        {countries.map((country) => (
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
    </Container>
  );
}

export default CountryCards;