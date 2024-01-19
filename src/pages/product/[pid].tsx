import { GetServerSideProps } from 'next'

import { useState } from 'react';
import Footer from 'src/components/footer';
import Layout from 'src/layout/Main';
import Breadcrumb from 'src/components/breadcrumb';
import Gallery from 'src/components/product-single/gallery';
import Content from 'src/components/product-single/content';
import Description from 'src/components/product-single/description';
import Reviews from 'src/components/product-single/reviews';
import { server } from 'src/utils/server'; 

// types
import { ProductType } from 'src/utils/types';

type ProductPageType = {
  product: ProductType;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pid = query.pid;
  const res = await fetch(`${server}/api/product/${pid}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  }
}

const Product = ({ product }: ProductPageType) => {
  const [showBlock, setShowBlock] = useState('description');

  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button type="button" onClick={() => setShowBlock('description')} className={`btn btn--rounded ${showBlock === 'description' ? 'btn--active' : ''}`}>Description</button>
              <button type="button" onClick={() => setShowBlock('reviews')} className={`btn btn--rounded ${showBlock === 'reviews' ? 'btn--active' : ''}`}>Reviews (2)</button>
            </div>

            <Description show={showBlock === 'description'} />
            <Reviews product={product} show={showBlock === 'reviews'} />
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}

export default Product
