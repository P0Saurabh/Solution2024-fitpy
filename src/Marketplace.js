import React from 'react';
import Product from './Product'; // Make sure you have this component
import products from './products'; // Your products data

const Marketplace = () => {
  return (
    <div className="marketplace">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Marketplace;
