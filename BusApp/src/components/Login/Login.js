import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';
import { withNavigation } from 'react-navigation';

class Login extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../images/schoolbus.png')}
                    />
                    <Text style={styles.title}> APS School Bus Tracking</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm />
                </View>
            </KeyboardAvoidingView>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200
    },
    title: {
        color: '#000',
        marginTop: 10,
        fontSize: 20,
        width: 300,
        textAlign: 'center',
        opacity: 0.9
    }
});

export default withNavigation(Login);