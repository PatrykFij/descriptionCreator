import { Button } from "@material-ui/core";
import { useEffect } from "react";
import * as api from "./api";

const Accountancy = () => {
  const { getAllProducts, products } = api.useGetOrders();

  const handleGetProducts = () => {
    getAllProducts();
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <h1>Księgowość</h1>
      <Button onClick={handleGetProducts}>Pobierz dane</Button>
    </>
  );
};

export default Accountancy;
