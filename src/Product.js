import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
      <h3>{product.name}</h3>
      <p>Coins: {product.price}</p>
    </div>
  );
};

export default Product;
