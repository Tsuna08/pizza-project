import { Product as ProductType } from '@/types/products';
import { useLoaderData } from 'react-router-dom';

export const Product = () => {
  const data = useLoaderData() as ProductType;

  return <>Продукт - {data.name}</>;
};

export default Product;
