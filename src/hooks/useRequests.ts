export const useRequests = () => {

  const fetchCategories = async () => {
    const data = await fetch('https://fakestoreapi.com/products/categories').then((r) =>
      r.json()
    );
    return data;
  };

  const fetchProducts = async () => {
    const data = await fetch("https://fakestoreapi.com/products").then((r) => r.json());
    return data;
  };
  
  const fetchProduct = async (id: string) => {
    const data = await fetch(`https://fakestoreapi.com/products/${id}}`).then((r) => r.json());
    return data;
  };


  return {
    fetchCategories,
    fetchProducts,
    fetchProduct
  }
}