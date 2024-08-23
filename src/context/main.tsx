import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CartProduct, Product } from "../models";

interface Context {
  cart: CartProduct[];
  total: number;
  emptyCart: () => void;
  addCart: (product: Product) => void;
  removeCart: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
}

interface Props {
  children: ReactNode
}

const initialState: Context = {
  cart: [],
  total: 0,
  onIncrement: () => { },
  onDecrement: () => { },
  removeCart: () => { },
  emptyCart: () => { },
  addCart: () => { },
}

export const MainContext = createContext<Context>(initialState);
export const useMainContext = () => useContext(MainContext);

export default function MainContextProvider({ children }: Props) {

  const [cart, setCart] = useState<CartProduct[]>(initialState.cart);
  const [total, setTotal] = useState(initialState.total);

  const addCart = (product: Product) => {
    setCart((prev) => {
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1
        }
      ]
    })
  }

  const removeCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id != id));
  }

  const emptyCart = () => {
    setCart([]);
  }

  const onIncrement = (id: number) => {
    setCart((prev) => prev.map((item) => item.id == id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const onDecrement = (id: number) => { 
    setCart((prev) => prev.map((item) => item.id == id ? { ...item, quantity: item.quantity - 1 } : item));
  };

  useEffect(() => {
    setTotal(cart.reduce((prev, current) => {
      return prev + (current.price * current.quantity)
    }, 0 ))
  }, [cart])


  return (
    <MainContext.Provider value={{ cart, total, addCart, removeCart, emptyCart, onDecrement, onIncrement }}>
      {children}
    </MainContext.Provider>
  )
}