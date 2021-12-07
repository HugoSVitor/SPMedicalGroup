import React, {Component} from 'react';
import jwtDecode from 'jwt-decode';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

import consultasPac from './consultasPaciente'

export default class Login extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            email : "alexandre@gmail.com",
            senha : "ale123"
        }
    } 

    realizarLogin = async () => {
        console.warn(this.state.email + ' ' + this.state.senha)

        const resposta = await api.post('/Login',
            {
                email: this.state.email,
                senha: this.state.senha
            }
        )

        const token = resposta.data.token;
        await AsyncStorage.setItem('userToken',token)

        if (resposta.status == 200) {
            if (jwtDecode(token).role == '1')
            {
                this.props.navigation.navigate('ConsultasPac');
            }


            if (jwtDecode(token).role == '2')
            {
            }
            
        }
        console.warn(token)
    }

    render() {
        return(
            <ImageBackground  style={StyleSheet.absoluteFillObject} source={require('../../assets/img/Rectangle5.png')}>
                <View style={styles.main} >
                    <Image style={styles.logo} source={require('../../assets/img/image1.png')}/>
                    <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#78736D"
                    keyboardType="email-address"
                    onChangeText={email => this.setState({email})}
                    />

                    <TextInput 
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#78736D"
                    keyboardType="default"
                    secureTextEntry={true}
                    onChangeText={senha => this.setState({senha})}
                    />

                    <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={this.realizarLogin}>
                    <Text style={styles.btnLoginText}>Login</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create(
    {
        overlay: {
            ...StyleSheet.absoluteFillObject, 
            backgroundColor: 'rgba(183,39,255,0.79)', 
        },

        main: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        },

        logo: {
            width: 128,
            height: 159,
            marginBottom: 50
        },

        input: {
            backgroundColor: 'white',
            width: '70%',
            borderRadius: 20,
            paddingLeft: 15,
            marginTop: 50
        },

        btnLogin: {
            backgroundColor: '#81DF99',
            backfaceVisibility: 'visible',
            borderRadius: 20,
            height: 50,
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80
        },

        btnLoginText: {
            fontSize: 25,
            color: "black"
        }
        


    }
)