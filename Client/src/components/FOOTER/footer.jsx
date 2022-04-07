import React from 'react';
import { Link } from 'react-router-dom';
import "../STYLES/footer.css"

export default function Footer() {

    return (
        <div className="footer">
            
            <span>© 2022 ZooPer Trivia</span>
            <Link to="/administrador"><span> Acceder como Administrador </span></Link>
        </div>
    )
}