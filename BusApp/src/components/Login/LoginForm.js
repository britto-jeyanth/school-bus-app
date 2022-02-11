import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, StatusBar} from 'react-native';
import {withNavigation} from "react-navigation";

class LoginForm extends Component {


    render() {
        //const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle={"light-content"}
                />
                <TextInput
                    placeholder="username or email"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    returnKeyType="go"
                    secureTextEntry
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                />

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate('Settings')}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <Text style={styles.textLink}> Create account </Text>
            </View>

        );
    }

}

const styles = StyleSheet.create({
   container: {
       padding: 20
   },
    input: {
       height: 40,
        backgroundColor: '#8658B2',
        opacity: 0.8,
        marginBottom: 15,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
       backgroundColor: '#8658B2',
        paddingVertical: 15,
        marginBottom: 15
    },
    buttonText: {
       textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    textLink: {
        color: '#3409db',
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 15,
        marginBottom: 50
    }
});

export default withNavigation(LoginForm);