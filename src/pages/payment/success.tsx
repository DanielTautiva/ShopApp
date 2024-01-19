import Layout from 'src/layout/Main';
import Footer from 'src/components/footer';
import Breadcrumb from 'src/components/breadcrumb';
import { useEffect, useState } from 'react';
import CheckoutStatus from 'src/components/checkout-status';

import styles from '../../../styles/Form.module.css';

const SuccessPage = () => {

    const [paymentResult, setPaymentResult]: any = useState();


    useEffect(() => {
        // Recupera el resultado almacenado en localStorage
        const storedResult = localStorage.getItem('paymentResult');
        if (storedResult) {
            setPaymentResult(JSON.parse(storedResult));
            // Limpia el resultado almacenado en localStorage
            // localStorage.removeItem('paymentResult');
        } else {
        // Maneja la situación en la que no hay resultado almacenado
        }
    }, []);

    console.log(paymentResult);
    

    return (

        <Layout>

                <section className="cart">
                    <div className="container">
                        <div className="cart__intro">
                            <h3 className="cart__title">Billing and Payment</h3>
                            <CheckoutStatus step="checkout" />
                        </div>

                        <div className="checkout-content-center">
                            <div className="checkout__col-6">
                                <div className="block">
                                    <h3 className="block__title">Billing complete</h3>
                                    <button type="button" className="btn btn--rounded btn--border">Print invoice</button>
                                </div>
                            </div>
                            
                            <div className='billing-complete'>
                                
                                <label> ◐ <span> Wompi ID: </span>  { paymentResult?.id} </label> 
                                
                                <label> ◐ <span> Reference: </span> { paymentResult?.reference}   </label>
                                
                                <label> ◐ <span>Amount In Cents:</span>{ paymentResult?.amount_in_cents}   </label> 
                                
                                <label> ◐ <span>Currency:</span>  { paymentResult?.currency} </label>
                                
                                <label> ◐ <span>Created:</span>  { paymentResult?.created_at} </label>
                                
                                <label> ◐ <span>Customer Email:</span>  { paymentResult?.customer_email}  </label>
                                
                                <label> ◐ <span>Payment Method:</span> { paymentResult?.payment_method_type} </label> 
                                
                                <label> ◐ <span>Payment Source:</span>  { paymentResult?.payment_source_id} </label>
                                
                                <label> <span>Credit Card Details:</span> </label> 
                                    
                                    <label> <span className='ml-5'>bind:</span>  { paymentResult?.payment_method?.extra.bin } </label>
                                    
                                    <label> <span className='ml-5'>brand:</span>  { paymentResult?.payment_method?.extra.brand } </label>
                                    
                                    <label> <span className='ml-5'>card type:</span>  { paymentResult?.payment_method?.extra.card_type } </label>
                            </div>
                        </div>


                           
                        <div className="cart-actions cart-actions--checkout">
                            <a href="/cart/cart" className="cart__btn-back"><i className="icon-left"></i> Back</a>
                            <div className="cart-actions__items-wrapper">
   
                            </div>
                        </div>
                    </div>
                </section>

      
            <Footer />
        </Layout> 

    );
  };
  
  export default SuccessPage;