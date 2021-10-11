import React from "react";
import { Container, Row } from "react-bootstrap";
//Components
import Loading from "../Loading";
import Product from "../Product";

export default function Products(props) {
  const {
    products: { result, loading },
  } = props;

  const { addProductsCard } = props;

  return (
    <Container>
      <Row>
        {loading || !result ? (
          <Loading />
        ) : (
          result.map((products, index) => (
            <Product
              key={index}
              product={products}
              addProductsCard={addProductsCard}
            />
          ))
        )}
      </Row>
    </Container>
  );
}
