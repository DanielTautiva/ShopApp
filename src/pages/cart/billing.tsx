import { useEffect, useState } from "react";
import CheckoutStatus from "src/components/checkout-status";
import styles from '../../../styles/Form.module.css';
import { HiAtSymbol, HiMap, HiOutlineUser, HiPhoneIncoming } from "react-icons/hi";
import CheckoutItems from "src/components/checkout/items";
import { useSelector } from "react-redux";
import { RootState } from 'store';

const Billing = () => {

    const [user, setUser] = useState({
      "email": "",
      "fullname": "",
      "address": "",
      "phone": "",
      "id": "",
  });

    useEffect(() => {
        // Recupera el resultado almacenado en localStorage
        const storedResult = localStorage.getItem('user');
        if (storedResult) {
          const { user } = JSON.parse(storedResult)
          setUser(user);
        }
    }, []);

    const priceTotal = useSelector((state: RootState) => {
        const cartItems = state.cart.cartItems;
        let totalPrice = 0;
        if(cartItems.length > 0) {
          cartItems.map(item => totalPrice += item.price * item.count);
        }
        return totalPrice;
      });

    return (

      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Billing and Payment</h3>
            <CheckoutStatus step="checkout" />
          </div>

          <div className="checkout-content">
            <div className="checkout__col-6">

              <div className="block">
                <h3 className="block__title">Billing Data</h3>


                {/* FORM */}
                <form className="form">
                  <div className="form__input-row form__input-row--six`"> 
                    <div className={`${styles.input_group}`}>
                        <input 
                          type="text"
                          placeholder='Email'
                          className={styles.input_text}
                          value= { user?.email }   
                          disabled
                        />
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--six`">
                  <div className={`${styles.input_group}`}>
                        <input 
                          type="text"
                          placeholder='Address'
                          className={styles.input_text}
                          value= { user?.address }  
                          disabled 
                        />
                        <span className='icon flex items-center px-4'>
                            <HiMap size={25} />
                        </span>
                    </div>
                  </div>
                  
                  <div className="form__input-row form__input-row--two">
                      <div className={`${styles.input_group}`}>
                        <input 
                            type="text"
                            placeholder=' Nombre Completo'
                            className={styles.input_text}
                            value= { user?.fullname } 
                            disabled  
                        />
                        <span className='icon flex items-center px-4'>
                            <HiOutlineUser size={25} />
                        </span>
                    </div>
                    <div className="form__col">
                      <input className={styles.input_text} type="text" placeholder="Postal code / ZIP" value="110510"/>
                    </div>
                  </div>
                  
                  <div className="form__input-row form__input-row--two">
                    <div className={`${styles.input_group}`}>
                        <input 
                          type="text"
                          placeholder='Numero de Telefono'
                          className={styles.input_text}
                          value= { user?.phone }
                          disabled  
                        />
                        <span className='icon flex items-center px-4'>
                            <HiPhoneIncoming size={25} />
                        </span>
                    </div>

                    <div className="form__col">
                      <div className="select-wrapper select-form">
                        <select className={styles.input_text} disabled>
                          <option>Country</option>
                          <option value="COL" selected>Colombia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Accepted payment methods</h3>
                <ul className="round-options round-options--three">
                  <li className="round-item">
                    <img src="/images/logos/wompi.png" alt="wompi" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/visa.png" alt="visa" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/mastercard.png" alt="mastercard" />
                  </li>
                </ul>
              </div>

            </div>
            
            <div className="checkout__col-2">
              <div className="block">
                <h3 className="block__title">Your cart</h3>
                <CheckoutItems />
                
                <div className="checkout-total">
                  <p>Total cost</p>
                  <h3>${priceTotal.toFixed(3)}</h3>
                </div>
              </div>
            </div>
          </div>
          
       
        </div>
      </section>

    );
  };
  
  export default Billing;