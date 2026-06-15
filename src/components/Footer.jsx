import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-brown text-white pt-5">

      <div className="container">
        <div className="row">

          <div className="col-md-3 mb-4">
            <h4>TBB Cafe</h4>
            <p>
              Crafting unforgettable dining experiences with passion.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Quick Links</h5>
            <Link className="d-block " to="/">Home</Link>
            <Link className="d-block " to="/aboutus">About us</Link>
            <Link className="d-block " to="/menu">Menu</Link>
            <Link className="d-block " to="/contact">Contact</Link>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Contact</h5>
            <p>Pune, India</p>
            <p>+91 1234567890</p>
            <p>info@theogcafe.com</p>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Follow Us</h5>
            <Link to="https://instagram.com" target="_blank">
              <FaInstagram size={25} />
            </Link><br></br>

            <Link to="https://facebook.com" target="_blank">
              <FaFacebook size={25} />
            </Link><br></br>

            <Link to="https://twitter.com" target="_blank">
              <FaTwitter size={25} />
            </Link>
          </div>

        </div>

        <hr />

        <p>
          © 2026 TBB Cafe • All Rights Reserved
        </p>
      </div>

    </footer>
  );
}