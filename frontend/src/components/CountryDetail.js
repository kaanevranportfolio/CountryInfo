import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

function CountryDetail({ countries }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const country = countries.find(c => c.name.common === name);

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <Container className="text-center my-4">
      <Card className="mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Img variant="top" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <Card.Body>
          <Card.Title>{country.name.common}</Card.Title>
          <Card.Text>
            <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
            <br />
            <strong>Region:</strong> {country.region}
            <br />
            <strong>Population:</strong> {country.population.toLocaleString()}
            <br />
            <strong>Area:</strong> {country.area.toLocaleString()} km²
            <br />
            <strong>Currency:</strong> {Object.values(country.currencies || {}).map(currency => currency.name).join(', ')}
            <br />
            <strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}
          </Card.Text>
          <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CountryDetail;