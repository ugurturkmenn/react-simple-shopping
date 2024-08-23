import React, { useEffect, useMemo, useState } from 'react'
import { Product } from '../../models';
import { useMainContext } from '../../context/main';
import { BaggageClaim, Minus, Plus, Trash2 } from 'lucide-react';
import "./index.css";

interface Props {
  value?: number;
  max?: number;
  id?: number;
  product?: Product;
}

const ProductAction = ({ value = 1, max = 10, id, product }: Props) => {
  const [quantity, setQuantity] = useState(value);
  const { cart, addCart, onIncrement, onDecrement, removeCart } = useMainContext();

  const productID = useMemo(() => {
    if (typeof id === "number") {
      return id;
    }

    if (typeof product?.id !== "undefined") {
      return product.id;
    }

    return undefined;
  }, [id, product?.id]);

  const foundInCart = useMemo(() => {
    return cart.find((item) => item.id === productID);
  }, [cart, productID]);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const handleIncrement = (e: any) => {
    if (quantity < max) {
      onIncrement(productID);
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = (e: any) => {
    if (quantity === 1) {
      removeCart(productID);
    } else {
      onDecrement(productID);
      setQuantity(quantity - 1);
    }
  };

  if (foundInCart) {
    return (
      <div className="awrapper">
        <div className="innerWrapper">
          <div className="minus" onClick={handleDecrement}>
            {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
          </div>
          <div className="quantity">{quantity}</div>
          <div className="plus" onClick={handleIncrement}>
            <Plus size={16} />
          </div>
        </div>
      </div>
    );
  }

  if (!productID) {
    return undefined;
  }

  const handleAddCart = (e: any) => {
    e.stopPropagation();
    addCart(product);
  };

  return (
    <div onClick={handleAddCart} className='addToCart'>
      <BaggageClaim /> <span>Add to cart</span>
    </div>
  )
}

export default ProductAction
