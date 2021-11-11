import React from 'react'
import logo from '../../assets/imagens/image1.png'

export default function Header(){
    return(
        <div>
            <header>
                <div className="header_container">
                    <div className="menu_hamburger"/>
                
                    <img className="logoHeader" src={logo} alt="Logo SpMedGroup"/>
                    <nav className="navUsuario">
                        <span>Usuario</span>
                        <div className="imagemUsuario" />
                
                    </nav>
                </div>
            </header>
        </div>
    )
}