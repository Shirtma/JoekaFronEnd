import React from 'react';
import Mealcard from '../../components/mealcard';
import { useProductsContext } from '../../context/products_context';

function Product({ tab }) {
  const { products, addToCart } = useProductsContext();
  return (
    <>
      <p className="title" style={{ textTransform: 'uppercase' }}>
        {tab}
      </p>
      <div className="takeout__mealContainer1">
        {products
          && products.map(
            (product, i) => product.category === tab && (
            <Mealcard
              key={i}
              className1="takeout__mealDetail"
              className2="takeout__mealTopFlex"
              className3="takeout__mealRightFlex"
              price={product.price}
              text={product.menuItem}
              innerText={product.description.slice(0, 100)}
              Image={product.image}
              handleClick={() => addToCart(product)}
            />
            ),
          )}
      </div>
    </>
  );
}

export default Product;
