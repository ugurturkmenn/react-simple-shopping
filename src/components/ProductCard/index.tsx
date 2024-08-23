import { Product } from '../../models';
import "./index.css";
import ProductAction from '../ProductAction/ProductAction';
import { formatPrice } from '../../utils';
import "./index.css"

const Productcard = ({ product }: { product: Product }) => {

  return (
    <div className='card'>
      <a href={`/product/${product.id}`}>
        <div className='pwrapper'>
          <div className='imageWrapper'>
            <img className="image" src={product.image} alt={product.title} />
          </div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      </a>
      <div className='pc-bottom'>
        <h3 className='price'>{formatPrice(product.price)}</h3>
        <ProductAction product={product} />
      </div>
    </div>
  )
}

export default Productcard
