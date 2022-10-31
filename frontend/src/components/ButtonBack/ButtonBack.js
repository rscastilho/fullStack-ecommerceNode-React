import React from 'react';
import { Link } from 'react-router-dom';

const ButtonBack = ({local}) => {
  return (
    <>
      <Link to={local}>
        <button className={`btn btn btn-primary`}>Voltar</button>
      </Link>
    </>
  );
};

export default ButtonBack;
