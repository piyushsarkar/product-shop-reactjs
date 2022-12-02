import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import useFetch from '../hooks/useFetch';
import styles from '../styles//Home.module.css';

const filterProducts = (products, brand, sort) => {
  let filteredProducts = [...products];
  if (brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand === brand
    );
  }
  if (sort) {
    filteredProducts.sort((a, b) => {
      if (sort === 'price_asc') {
        return a.price - b.price;
      } else if (sort === 'price_desc') {
        return b.price - a.price;
      } else if (sort === 'discount') {
        return b.discountPercentage - a.discountPercentage;
      } else {
        return b.rating - a.rating;
      }
    });
  }
  return filteredProducts;
};

const Home = () => {
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [sort, setSort] = useState('rating');
  const [brandList, setBrandList] = useState([]);
  const {
    data: { products = [] },
    isLoading,
  } = useFetch(
    `https://dummyjson.com/products${
      category ? `/category/${category}` : ''
    }?limit=100`
  );
  const { data: categories } = useFetch(
    'https://dummyjson.com/products/categories'
  );

  useEffect(() => {
    if (isLoading) return;
    setBrand('');
    setBrandList([...new Set(products.map((product) => product.brand))]);
  }, [products, isLoading]);

  const filteredProducts = filterProducts(products, brand, sort);

  return (
    <div className={styles.container}>
      <div className={styles.sidepanel}>
        <h3>Filter</h3>
        <div className={styles.category}>
          <label>Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">All</option>
            {categories.map((item, id) => (
              <option key={id} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.brand}>
          <label>Brand</label>
          <select onChange={(e) => setBrand(e.target.value)} value={brand}>
            <option value="">All</option>
            {brandList.map((item, id) => (
              <option key={id} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.sort}>
          <label>Sort By:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rating">Rating</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="discount">Discount</option>
          </select>
        </div>
      </div>
      <div className={styles.products}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};
export default Home;
