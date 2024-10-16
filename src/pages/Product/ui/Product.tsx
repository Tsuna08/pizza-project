import { useLoaderData } from 'react-router-dom';

import { Product as ProductType } from '@/types/products';

export const Product = () => {
  const data = useLoaderData() as ProductType;

  return <>Продукт - {data.name}</>;
};

export default Product;
