import React from 'react'
import phone from "../../assets/imagens/Rectangle19.png"
import email from '../../assets/imagens/Rectangle84.png'
import logo from '../../assets/imagens/image1.png'
import redesSociais from '../../assets/imagens/Rectangle18.png'

export default function Footer(){
    return(
        <div>
            <footer>
                <div>
                    <div className="phoneFooter">
                        <img className="imgPhone" src={phone} alt="Telefone"/>
                        <span>96573-1931</span>
                    </div>
                    <div className="emailFooter">
                        <img className="imgEmail" src={email} alt="Email"/>
                        <span>spmedgroup@gmail.com</span>
                    </div>
                </div>

                <img className="logoFooter" src={logo} alt="Logo"/>

                <div className="redesSociais">
                    <span>Redes sociais</span>
                    <img src={redesSociais} alt="Logos de redes sociais"/>
                </div>
            </footer>
        </div>
    )
}