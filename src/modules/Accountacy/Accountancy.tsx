import { Button } from '@material-ui/core';
import * as api from './api';

import { useEffect } from 'react';

const Accountancy = () => {
  const { getAllProducts } = api.useGetOrders();

  const handleGetProducts = async () => {
    const allProducts = await getAllProducts();
    console.log(allProducts);
  };

  return (
    <>
      <h1>Księgowość</h1>
      <Button onClick={handleGetProducts}>Pobierz dane</Button>
    </>
  );
};

export default Accountancy;
