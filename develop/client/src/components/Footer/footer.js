import React from "react";
import './footer.css'

const Footer = () => {
  
  return (
    <div className="main-footer">
        <div className="container">
           <div className="row">
            {/* Column1*/}
            <div className="col1">
              <h4>GameBy INC</h4>
               <ul className="list-unstyled">
                <li>964-342-110</li>
                <li>Melbourne, Australia</li>
               </ul>
            </div>
            {/* Column2*/}
            <div className="col">
              <h4>STUFF</h4>
               <ul className="list-unstyled">
               <li>Parwiz Haqbien</li>
               </ul>
            </div>
            {/* Column3*/}
            <div className="col">
              <h4>Contact Me</h4>
               <ul className="list-unstyled">
               <li>parwiz.jan03@gmail.com</li>
               </ul>
            </div>
           </div>
           <hr />
        </div>
    </div>
  );
};

export default Footer;