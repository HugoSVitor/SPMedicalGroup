import {useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const center = {
    lat: -23.594233846063375,
    lng: -46.64208733148546
}

export default function LocalizacoesMapa() {
    const [listaLocalizacoes, setListaLocalizacoes] = useState([]);

    useEffect(ListarLocalizacoes,[]);

    function ListarLocalizacoes() {
        axios('http://192.168.5.66:5000/api/localizacoes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
              },
        })

        .then((resposta) => {
            if (resposta.status === 200) {
                setListaLocalizacoes(resposta.data);
                console.log(resposta.data)
            }
        })
        .catch(error => console.log(error))
    }

    return(
        <LoadScript googleMapsApiKey='AIzaSyBJV-f9j0ZYmEXX5NYuy5nZmKiAzZoaPPQ'>
            <GoogleMap
                center={center}
                zoom={20}
                mapContainerStyle={{height: '100%'}}>
                {
                    listaLocalizacoes.map((marcador) => {
                        return (<Marker
                                key={marcador.id}
                                position={{lat: parseFloat(marcador.latitude), lng: parseFloat(marcador.longitude)}}
                            />)
                    })
                }
            </GoogleMap>
        </LoadScript>
    )
}