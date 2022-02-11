/**
 * Screen menu of children to select to then message school
 * made with help from ??
 *
 */


import React from 'react';
import {Text, StyleSheet, View, Image, AsyncStorage} from 'react-native';
import {withNavigation} from "react-navigation";
import SettingsList from 'react-native-settings-list';

class Inbox extends React.Component {
    constructor() {
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false, listData: []};
        this.setData();
    }

    //gets data from async storage and puts it in a users array
    async setData() {
        const users = [];
        let keys = await AsyncStorage.getAllKeys();
        for (let inKey of keys) {
            if (inKey.includes("user")) {
                let obj = await AsyncStorage.getItem(inKey);
                obj = JSON.parse(obj);
                if (obj.name != null)
                    users.push(obj);
            }
        }
        //sets the listData field of state to the users array from async storage
        this.setState({
            listData: users,
        });
    }
    //creates the list of users/children that can be pressed on to move to the chat screen
    usersListArr() {
        return this.state.listData.map((buttonInfo) => {
            return (
                <SettingsList.Item
                    key={buttonInfo.id}
                    itemWidth={70}
                    backgroundColor="#F5FCFF"
                    //icon={<Image style={styles.imageStyle} source={require('../images/jill.png')}/>}
                    icon={<Image style={styles.imageStyle} source={buttonInfo.avatarSource}/>}
                    title={buttonInfo.name}
                    titleInfo={buttonInfo.school}
                    onPress={() => this.props.navigation.navigate('Chat', {'user': buttonInfo})}
                />
            );
        });
    }
    render() {
        this.setData();
        return (
            <View style={{backgroundColor: '#F5FCFF', flex: 1}}>

                {/*renders the header text*/}
                <View style={styles.headerStyle}>
                    <Text style={styles.ViewRoute}> View Inbox </Text>
                </View>

                {/*renders the list of users/children*/}
                <View style={{backgroundColor: '#F5FCFF', flex: 0.6, flexDirection: 'column',
                    justifyContent: 'center'}}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                        {this.usersListArr()}
                    </SettingsList>
                </View>
            </View>
        );

    }

    //updates the list of users/children as they are added/removed
    onValueChange(value) {
        this.setState({switchValue: value});
    }
}

const styles = StyleSheet.create({

    imageStyle: {
        alignItems: 'center',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 25

    },
    headerStyle: {
        justifyContent: 'flex-end',
        flexDirection: 'column',
        borderBottomColor: '#8658B2',
        borderBottomWidth: 1,
        height: 10,
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        flex: 1/11.4,


    },
    ViewRoute: {
        textAlign: 'left',
        color: '#8658B2',
        fontSize: 22,
        marginBottom: 5,
        fontFamily: 'Helvetica',
    },
});
export default withNavigation(Inbox)