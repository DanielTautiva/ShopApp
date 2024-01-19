import { useSelector } from 'react-redux';
import { useSession } from "next-auth/react"
import { useFormik } from 'formik';
import { useState } from 'react';
import { HiCurrencyDollar, HiOutlineCalendar, HiOutlineUserCircle } from 'react-icons/hi';
import Layout from 'src/layout/Main';
import { RootState } from 'store';
import Modal from 'react-modal';
import creditCardType from 'credit-card-type';
import styles from '../../../styles/Form.module.css';
import { useRouter } from 'next/router';
import Billing from './billing';


// Configura el modal
Modal.setAppElement('#__next');

const CheckoutPage = () => {

  const router = useRouter()
  const { data: session } = useSession();

  // Estados para el modal y los datos de la tarjeta
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardOwner, setCardOwner] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [ccv, setCcv] = useState('');
  const [cardType, setCardType] = useState(''); 
  const [loading, setLoading] = useState(false);

  const priceTotal = useSelector((state: RootState) => {
      const cartItems = state.cart.cartItems;
      let totalPrice = 0;
      if(cartItems.length > 0) {
        cartItems.map(item => totalPrice += item.price * item.count);
      }
      return totalPrice;
  });



  const formik = useFormik({
    initialValues: { },
    onSubmit
})

  async function onSubmit(values: any){
    setModalIsOpen(false);
    setLoading(true);

    // Identificar la franquicia de la tarjeta
    const cardType = identifyCardType(cardNumber);

    const payload = {
      cardOwner,
      cardNumber,
      expiryDate,
      email: session?.user?.email,
      priceTotal: (priceTotal * 1000),
      cardType
    };

    try {
      const response = await fetch('http://ec2-54-221-103-90.compute-1.amazonaws.com/api/transactions/pay-gateway', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setLoading(false);
      if (response.ok) {
     
          const result = await response.json();
          localStorage.setItem('paymentResult', JSON.stringify(result));
        router.push(`/payment/success`);
      } else {

        console.error('Error:', response.statusText);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error.message);
    }
  }

  const identifyCardType = (cardNumber) => {
    const cardType = creditCardType(cardNumber);
    return cardType.length > 0 ? cardType[0].niceType : 'Desconocida';
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const formatCardNumber = (input) => {
    const value = input.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    const formattedValue = value.replace(/(\d{4})/g, '$1-'); // Agregar guiones cada 4 dígitos
    const trimmedValue = formattedValue.slice(0, 19); // Limitar a 19 caracteres (20 con el guión)
    setCardNumber(trimmedValue);
  };

  const formatDate = (input) => {
    // Mantener solo los números y la tecla de retroceso
    const value = input.replace(/[^\d\b]/g, '');
  
    // Validar que los dos primeros dígitos estén en el rango de 01 a 12
    const monthPart = value.slice(0, 2);
    if (monthPart && (isNaN(monthPart) || monthPart < 0 || monthPart > 12)) {
      // Puedes manejar la validación aquí (por ejemplo, mostrar un mensaje de error)
      return;
    }

    // Agregar guiones cada 2 dígitos
    const formattedValue = value.replace(/(\d{2})/g, '$1/');
    const trimmedValue = formattedValue.slice(0, 5); // Limitar a 5 caracteres (MM/YY)
  
    setExpiryDate(trimmedValue);
  };

  function LoadingModal() {
    return (
      <div className='loading-payment'> 
        <img className='loading-img' src='https://www.emoneywallets.com/wp-content/uploads/2021/07/ezgif-1-d6928d437c51.gif' width="450px" height="450px" alt="Cargando..." />
        <b className='loading-text'> Procesando tu Pago  </b> 
      </div>
    );
  }

  return (
    <Layout>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Datos de Tarjeta"
        className="react-modal-content" 
        overlayClassName="react-modal-overlay" 
      >
        <form className="form" onSubmit={formik.handleSubmit} >
        <h2>Ingresa los datos de tu tarjeta de credito {cardType}</h2>
        <br /> <br />
        <div className="checkout-content">
            <div className="checkout__col-12">

              <div className="block">
                
                  <div className="form__input-row form__input-row--six`">
                    <div className={`${styles.input_group}`}>
                      <input
                        type="text"
                        value={cardOwner}
                        placeholder='Propietario'
                        className={styles.input_text}
                        onChange={(e) => setCardOwner(e.target.value)}
                        required
                      />
                      <span className='icon flex items-center px-4'>
                          <HiOutlineUserCircle   size={25} />
                      </span>
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--six`">
                    <div className={`${styles.input_group}`}>
                      <input
                        type="text"
                        value={cardNumber}
                        placeholder='Numero de tarjeta de credito'
                        className={styles.input_text}
                        onChange={(e) => formatCardNumber(e.target.value)}
                        required
                      />
                      <span className='icon flex items-center px-4'>
                          <HiCurrencyDollar  size={25} />
                      </span>
                    </div>
                  </div>
                  
                  <div className="form__input-row form__input-row--two">
                      <div className={`${styles.input_group}`}>
                        <input 
                            type="text"
                            placeholder='Fecha de Vencimiento'
                            className={styles.input_text}
                            value={expiryDate}
                            onChange={(e) => formatDate(e.target.value)}
                        />
                        <span className='icon flex items-center px-4'>
                            <HiOutlineCalendar  size={25} />
                        </span>
                    </div>
                    <div className="form__col">
                      <input 
                        className={styles.input_text} 
                        type="number" 
                        placeholder="cvv" 
                        value={ccv}
                        onChange={(e) => setCcv(e.target.value.slice(0, 3))}
                        required
                        />
                    </div>
                  </div>   
                
              </div>
            </div>
          </div>
          <br /> 
          <div className="cart-actions cart-actions--checkout"> 
            <div className="cart-actions__items-wrapper flex-actions-between">
                <button onClick={() => closeModal()} type="button" className="btn btn--rounded btn--border"> Close Modal </button>
                <button type="submit" className="btn btn--rounded btn--yellow">
                    Confirm to payment
                </button>
            </div>
          </div>
          </form>
      </Modal>

      <Billing />

      <section className="cart">
        <div className="container">
        <div className="cart-actions cart-actions--checkout">
              <a href="/cart/cart" className="cart__btn-back"><i className="icon-left"></i> Back</a>
              <div className="cart-actions__items-wrapper">
                
                
                <button type="button" className="btn btn--rounded btn--border">Continue shopping</button>


                <button onClick={openModal} type="button" className="btn btn--rounded btn--yellow">Proceed to payment</button>
              </div>
            </div>
          </div>
      </section>

      {loading && <LoadingModal />}

    </Layout>
  )
};

export default CheckoutPage