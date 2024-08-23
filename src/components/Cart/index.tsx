import React, { useState } from 'react'
import "./index.css";
import { useMainContext } from '../../context/main';
import { formatPrice } from '../../utils';
import ProductAction from '../ProductAction/ProductAction';
import { SquareX, Trash2Icon } from 'lucide-react';

const Cart = () => {
  const { cart, total, emptyCart } = useMainContext();
  const [cartIsShow, setCartIsShow] = useState(false);


  return (
    <div id='cart-wrapper'>
      <div className="cartwrapper" onClick={() => setCartIsShow(true)}>
        {formatPrice(total)}
      </div>

      {cartIsShow && (
        <div className='cart-content'>
          <div className='innerContainer'>
            <div className='heading'>
              <h2>Cart</h2>
              <SquareX style={{ cursor: "pointer" }} onClick={() => setCartIsShow(false)} />
            </div>

            {cart.length === 0 && <div className='noFound'> no items in the cart!</div>}

            {cart.length > 0 && (
              <>
                <ul className='cart-items'>
                  {cart.map((item) => (
                    <li key={item.id}>
                      <div className='info'>
                        <h4>{item.title}</h4>
                        <div className='price'>
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>

                      <ProductAction id={item.id} value={item.quantity} />
                    </li>
                  ))}
                </ul>

                <div className='cart-total'>
                  Total: {formatPrice(total)}
                </div>

                <div className='cart-bottom'>
                  <div className='emptyButton' onClick={emptyCart}>
                    <Trash2Icon />
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
