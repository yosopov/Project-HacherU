const Footer = () => {
    return (
      <p style={{backgroundColor:'#198754c7'}} className="border-top border-1 border-dark  pt-3 text-center m-0 p-3">
        <span>
        yizYos <i className="bi bi-shop text-danger"></i> Shop 
        </span>
        <span className="mx-1">&copy;</span>
        <span>{new Date().getFullYear()}</span>
      </p>
    );
  };
  
  export default Footer;
  