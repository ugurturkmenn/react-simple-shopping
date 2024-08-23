import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header'
import { useRequests } from './hooks/useRequests';
import { Product } from './models';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const { fetchProducts } = useRequests();

  /* Fetch products here */
  useEffect(() => {
    const request = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    request();
  }, []);

  return (
    <>
      <Header />
      <div className='container content'>
        <div className="products">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </>
  )
}

export default App
