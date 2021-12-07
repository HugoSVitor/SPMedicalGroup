import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ConsultasPac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: []
        };
    }

    //const token = await AsyncStorage.getItem('userToken');
    realizarLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Login')
        } catch (error) {
            
        }
    }

    buscarConsultas = async () => {

        const token = await AsyncStorage.getItem('userToken');
        console.warn(token)

        const resposta = await api.get('/Consultas/minhas/paciente', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })


        if (resposta.status === 200) {
            // console.warn(resposta.data)
            //const dadosAPI = resposta.data;
            this.setState({ listaConsultas: resposta.data })

            console.warn(this.state.listaConsultas)

        } else {
            console.warn('Não é StatusCode(200)')
        }

    }

    componentDidMount() { this.buscarConsultas() }

    render() {

        return (
            <View style={styles.main}>
                <View style={styles.header}>
                    <View style={styles.headerTitulo}>
                        <Text style={styles.titulo1}>Cons</Text> 
                        <Text style={styles.titulo2}>ultas</Text>  
                    </View>
                      
                    <TouchableOpacity onPress={() => this.realizarLogout()}>
                        <Image style={styles.sair} source={require('../../assets/img/exit.png')}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    <FlatList
                        contentContainerStyle={styles.mainBodyContent}
                        data={this.state.listaConsultas}
                        keyExtractor={item => item.idConsulta}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }

    renderItem = ({ item }) => (
        <View style={styles.flatListQuadrado}>

            <View style={styles.flatListSeparacao}>
                <Text style={styles.flatListFontGrande}>Paciente:</Text>
                <Text style={styles.flatListFontPequena}>{(item.idPacienteNavigation.nomePaciente)}</Text>
            </View>
            <View style={styles.flatListSeparacao}>
                <Text style={styles.flatListFontGrande}>Médico:</Text>
                <Text style={styles.flatListFontPequena}>{(item.idMedicoNavigation.nomeMedico)}</Text>
            </View>

            <View style={styles.flatListSeparacao}>
                <Text style={styles.flatListFontGrande}>{item.dataConsulta}</Text>
                <Text style={styles.flatListFontGrande}>{(item.idSituacaoNavigation.nomeSituacao)}</Text>
            </View>
            <View style={styles.flatListSeparacao}>
                <Text style={styles.flatListFontGrande}>Descrição:</Text>
                <Text style={styles.flatListFontPequena}>{item.descricaoConsulta}</Text>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center'
    },

    header: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#83BEDF',
        width: '60%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 350,
        marginBottom: 40
    },

    headerTitulo: {
        flexDirection: 'row',
        
    },

    titulo1:{
        fontSize: 40,
        color: '#83BEDF',
        fontWeight: '700'
    },

    titulo2:{
        fontSize: 40,
        color: '#81DF99',
        fontWeight: '700'
    },

    sair: {
        width: 40,
        height: 40,
        tintColor: '#81DF99'
    },

    body: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    mainBodyContent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },


    flatListQuadrado: {
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 20,
        width: 350,
        marginBottom: 40,
        height: 'auto',
        paddingBottom: 10,
        paddingTop: 10
    },

    flatListFontGrande: {
        fontWeight: '700',
        fontSize: 17,
        color: 'Gray'
    },

    flatListFontGrande: {
        fontWeight: '600',
        fontSize: 16,
    },

    flatListSeparacao: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})