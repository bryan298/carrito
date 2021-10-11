import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

//componets
import TopMenu from "./components/TopMenu";
import useFetch from "./hooks/useFetch";
import { urlApi, urlApi2 } from "./Utils/constants";
import Products from "./components/Products";
import { STORAGE_PRODUCT } from "./Utils/constants";

function App() {
  const products = useFetch(urlApi, null);
  const products2 = useFetch(urlApi2, null);
  console.log(products2);

  const [productCard, setProductCard] = useState([]);

  useEffect(() => {
    getProductCard();
  }, []);

  const getProductCard = () => {
    const idProduct = localStorage.getItem(STORAGE_PRODUCT);

    if (idProduct) {
      const idProductSplit = idProduct.split(",");
      setProductCard(idProductSplit);
    } else {
      setProductCard([]);
    }
  };

  const addProductsCard = (id, name) => {
    const idProduct = productCard;
    idProduct.push(id);
    setProductCard(idProduct);
    localStorage.setItem(STORAGE_PRODUCT, productCard);

    //para que se actualize el carrito img sin recargar pagina
    getProductCard();
    toast.success(`${name} Añadido al Carrito Correctamente`);
  };

  return (
    <div>
      <TopMenu
        productCard={productCard}
        getProductCard={getProductCard}
        products={products}
      />

      {/* a products se lo pasamos por pros */}
      <Products products={products} addProductsCard={addProductsCard} />
      {/* mensaje de que se agrego producto */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
