import React, { useState, useEffect } from "react";
import "./Cart.scss";
import { Button } from "react-bootstrap";
//imagenes
import { ReactComponent as CartEmpty } from "../../assets/img/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/img/cart-full.svg";
import { ReactComponent as Close } from "../../assets/img/close.svg";
import { ReactComponent as Garbage } from "../../assets/img/garbage.svg";
//Utils
import { STORAGE_PRODUCT, BASE_PATH } from "../../Utils/constants";
import {
  removeArrayDuplicates,
  countDuplicatesItemArray,
  removeItemArray,
} from "../../Utils/arrayFunc";

export default function Cart(props) {
  const { productCard, getProductCard, products } = props;
  const [cartOpen, setCartOpen] = useState(false);
  const CardWindConter = cartOpen ? 400 : 0;
  const [singuerProductCart, setSinguerProductCart] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const allProductId = removeArrayDuplicates(productCard);
    setSinguerProductCart(allProductId);
  }, [productCard]);

  useEffect(() => {
    const productData = [];
    let totalPrice = 0;

    const allProductId = removeArrayDuplicates(productCard);
    allProductId.forEach((productId) => {
      const quantity = countDuplicatesItemArray(productId, productCard);
      const productValue = {
        id: productId,
        quantity: quantity,
      };
      productData.push(productValue);
    });

    if (!products.loading && products.result) {
      products.result.forEach((product) => {
        productData.forEach((item) => {
          if (product.id == item.id) {
            const totalValue = product.price * item.quantity;
            totalPrice = totalPrice + totalValue;
          }
        });
      });
    }
    setCartTotalPrice(totalPrice);
  }, [productCard, products]);

  //Abrir Carrito
  const OpenCart = () => {
    setCartOpen(true);
    document.body.style.overflow = "hidden";
  };

  //Cerra Carrito
  const CloseCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "scroll";
  };

  //Eliminar productos agregados al local storage
  const EmtyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCT);
    getProductCard();
  };

  //incrementar Producto
  const increaseQuantity = (id) => {
    const arrayItemsCart = productCard;
    arrayItemsCart.push(id);
    localStorage.setItem(STORAGE_PRODUCT, arrayItemsCart);
    getProductCard();
  };

  //decrementar producto
  const decreaseQuantity = (id) => {
    const arrayItemsCart = productCard;
    const result = removeItemArray(arrayItemsCart, id.toString());
    localStorage.setItem(STORAGE_PRODUCT, result);
    getProductCard();
  };

  return (
    <>
      <Button variant="link" className="cart">
        {productCard.length > 0 ? (
          <CartFull onClick={OpenCart} />
        ) : (
          <CartEmpty onClick={OpenCart} />
        )}
      </Button>

      <div className="cart-content" style={{ width: CardWindConter }}>
        <CartConterHeader CloseCart={CloseCart} EmtyCart={EmtyCart} />
        <div className="cart-content__products">
          {singuerProductCart.map((idProductsCart, index) => (
            <CartConterProduct
              key={index}
              products={products}
              idsProductsCart={productCard}
              idProductCart={idProductsCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
        </div>
        <CartContentFooter cartTotalPrice={cartTotalPrice} />
      </div>
    </>
  );
}

function CartConterHeader(props) {
  const { CloseCart, EmtyCart } = props;

  return (
    <div className="cart-content__header">
      <div>
        <Close onClick={CloseCart} />
        <h2>Carrito</h2>
      </div>

      <Button variant="link" onClick={EmtyCart}>
        Vaciar
        <Garbage />
      </Button>
    </div>
  );
}

function CartConterProduct(props) {
  const {
    products: { loading, result },
    idsProductsCart,
    idProductCart,
    increaseQuantity,
    decreaseQuantity,
  } = props;

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCart == product.id) {
        const quantity = countDuplicatesItemArray(product.id, idsProductsCart);
        return (
          <RenderProduct
            key={index}
            product={product}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        );
      }
    });
  }

  return null;
}

function RenderProduct(props) {
  const { product, quantity, increaseQuantity, decreaseQuantity } = props;
  return (
    <div className="cart-content__product">
      <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />

      <div className="cart-content__product-info">
        <div>
          <h3>{product.name.substr(0, 25)}...</h3>
          <p>{product.price.toFixed(2)} $ / ud.</p>
        </div>
        <div>
          <p>En carri: {quantity} ud.</p>
          <div>
            <button onClick={() => increaseQuantity(product.id)}>+</button>
            <button onClick={() => decreaseQuantity(product.id)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartContentFooter(props) {
  const { cartTotalPrice } = props;

  return (
    <div className="cart-content__footer">
      <div>
        <p>Total aproximado: </p>
        <p>{cartTotalPrice.toFixed(2)} $</p>
      </div>
      <Button>Tramitar pedido</Button>
    </div>
  );
}
