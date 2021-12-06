import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';



export default class ConsultasPac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
            perfilLogado: ''
        };
    }

    //const token = await AsyncStorage.getItem('userToken');

    buscarConsultas = async () => {

        const token = await AsyncStorage.getItem('userToken');
        this.setState = ({ perfilLogado: await AsyncStorage.getItem('userToken') });

        const resposta = await api.get('/minhas/paciente', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })


        if (resposta.status === 200) {

            const dadosAPI = resposta.data;
            this.setState({ listaConsultas: dadosAPI })
            console.warn(listaConsultas)

        }

    }

    componentDidMount() { this.buscarConsultas() }

    render() {

        return (
            <View></View>
        )
    }

}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },

    body: {
        flex: 1,
        backgroundColor: 'red'
    }
})