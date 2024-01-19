import Logo from '../../../public/assets/logo';

const Footer = () => {
  return (
    <footer className="site-footer">

      <div className="site-footer__bottom">
        <div className="container">
          <p> Ingeniero Daniel Tautiva Solorzano - © 2024</p>
        </div>

        <ul className="site-footer__social-networks mx-auto text-center">
          <li><a href="https://www.facebook.com/DANNIELTAUTIVA/"><i className="icon-facebook"></i></a></li>
          <li><a href="https://www.linkedin.com/in/daniel-tautiva/"><i className="icon-linkedin"></i></a></li>
          <li><a href="https://www.instagram.com/daniel_tautiva/"><i className="icon-instagram"></i></a></li>
        </ul>
      </div>
    </footer>
  )
};


export default Footer