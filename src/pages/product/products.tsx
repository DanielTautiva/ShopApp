import Layout from 'src/layout/Main';
import Footer from 'src/components/footer';
import Breadcrumb from 'src/components/breadcrumb';
import ProductsFilter from 'src/components/products-filter';
import ProductsContent from 'src/components/products-content';

const Products = () => ( 
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter />
          <ProductsContent />
        </div>
      </section>
      <Footer />
    </Layout> 
)

export default Products;