import React, { useEffect, useState } from 'react'
import "./index.css";
import { useRequests } from '../../hooks/useRequests'
import Cart from '../Cart';

const Header = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { fetchCategories } = useRequests();

  useEffect(() => {
    const request = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    request();
  }, []);

  return (
    <header className="wrapper">
      <div className="container">
        <div className="categories">
          {categories.map((category, index) => (
            <a href={category} key={index}>{category}</a>
          ))}
        </div>
        <Cart />
      </div>
    </header>
  );
}

export default Header
