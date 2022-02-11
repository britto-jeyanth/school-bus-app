/**
 * Screen with chat feature to simulate messaging the transport coordinator of specific school
 * made using https://github.com/FaridSafi/react-native-gifted-chat
 *
 */

import React from "react";
import {Image, Text, StyleSheet, TouchableOpacity, View} from "react-native";
import {withNavigation} from "react-navigation";
import { GiftedChat } from 'react-native-gifted-chat';
import Inbox from './Inbox';


class Chat extends React.Component {
    state = {
        messages: [],
    }

    //sets the default screen visual with a message from school transport coordinator
    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello, welcome to the bus chat. Please note that sometimes we receive many chats and ' +
                        'cannot respond right away, but will assist you as soon as possible. Please ask any ' +
                        'transportation questions here.',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'School',
                        avatar: require('../images/school3.png'),
                    },
                },
            ],
        })
    }

    //adds new typed message to screen when user presses send
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }







    render() {
        let user = this.props.navigation.getParam('user', 'noUser');
        return (

            <View style={styles.container}>

                {/*renders the header text with a back button to the right*/}
                <View style={styles.headerStyle}>
                    <Text style={styles.ViewRoute}> {"Inbox: " + user.name} </Text>

                    <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Inbox')}>
                        <Image style = {{marginRight: 10}}
                            source={require('../images/back.png')} size={15}/>
                    </TouchableOpacity>

                </View>

                {/*renders the chat section of the screen*/}
                <View style={{flex:7/9, }}>
                    <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    />
                </View>

            </View>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },

    ViewRoute: {
        textAlign: 'left',
        color: '#8658B2',
        fontSize: 22,
        fontFamily: 'Helvetica',
    },
    headerStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#8658B2',
        borderBottomWidth: 1,
        height: 40,
        width: '100%',
        top: 30,
        alignItems: 'center',
        position: 'absolute',
        flex: 1/9,

    }

});

export default withNavigation(Chat);
