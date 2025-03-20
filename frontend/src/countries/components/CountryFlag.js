import React from 'react';

const CountryFlag = ({ flag }) => {
  return (
    <div className="country-flag">
      <img src={flag} alt="Country flag" />
    </div>
  );
};

export default CountryFlag;