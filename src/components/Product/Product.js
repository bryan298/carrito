import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { BASE_PATH } from "../../Utils/constants";
import "./Product.scss";

export default function Product(props) {
  const { product, addProductsCard } = props;

  return (
    <Col xs={3} className="product">
      <Card>
        <Card.Img variant="top" src={`${BASE_PATH}/${product.image}`} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.extraInfo}</Card.Text>
          <Card.Text>{product.price.toFixed(2)} $ / Unidad</Card.Text>
          <Button onClick={() => addProductsCard(product.id, product.name)}>
            Añadir al Carrito
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
