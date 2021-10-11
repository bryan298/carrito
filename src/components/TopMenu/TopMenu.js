import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./TopMenu.scss";
//imagenes
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
//Components
import Cart from "../Cart";

export default function TopMenu(props) {
  const { productCard, getProductCard, products } = props;

  return (
    <Navbar bg="dark" variant="dark" className="top-menu">
      <Container>
        {/* importamos funcion Logo principal */}
        <LogoPrincipal />
        {/* Importamos funcion Menu */}
        {/* <MenuPrincipal /> */}
        <Cart
          productCard={productCard}
          getProductCard={getProductCard}
          products={products}
        />
      </Container>
    </Navbar>
  );
}

function LogoPrincipal() {
  return (
    <Navbar.Brand>
      <Logo />
      <h2>La casa De Los Helados</h2>
    </Navbar.Brand>
  );
}

// function MenuPrincipal() {
//   return (
//     <Nav className="mr-auto">
//       <Nav.Link href="#">Apertivos</Nav.Link>
//       <Nav.Link href="#">Helados</Nav.Link>
//       <Nav.Link href="#">Mascotas</Nav.Link>
//     </Nav>
//   );
// }
