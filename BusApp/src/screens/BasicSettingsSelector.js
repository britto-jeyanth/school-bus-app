import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import {withNavigation} from "react-navigation";
import SettingsList from 'react-native-settings-list';



class BasicSettingsSelector extends React.Component {
    constructor() {
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false, listData: []};
        this.setData();
    }

    //gets all the users
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

        this.setState({
            listData: users,
        });
    }

    //list of all the users
    usersListArr() {
        return this.state.listData.map((buttonInfo) => {
            return (
                <SettingsList.Item
                    key={buttonInfo.id}
                    itemWidth={70}
                    backgroundColor="#F5FCFF"
                    icon={<Image style={styles.imageStyle} source={buttonInfo.avatarSource}/>}
                    title={buttonInfo.name}
                    titleInfo={buttonInfo.school}
                    //passes selected student to Student.js, type is update because the user is trying to update student
                    onPress={() => this.props.navigation.navigate('Student', {'user': buttonInfo, 'type': "update"})}
                />
            );
        });
    }

    //renders list of users
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    <Text style={styles.ViewRoute}> Basic Settings </Text>
                    <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Settings')}>
                        <Image style = {{marginRight: 10}}
                               source={require('../images/back.png')} size={15}/>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#F5FCFF', flex: 0.807, flexDirection: 'column', justifyContent: 'center'}}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>

                        {this.usersListArr()}

                    </SettingsList>
                </View>
            </View>
        );
    }

    onValueChange(value) {
        this.setState({switchValue: value});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',

    },
    imageStyle: {
        alignItems: 'center',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 25,

    },

    profile: {
        marginTop: 10,
        marginBottom: 20
    },

    blank: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center'
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

    },
    ViewRoute: {
        textAlign: 'left',
        color: '#8658B2',
        fontSize: 22,
        marginBottom: 5,
        fontFamily: 'Helvetica',
    },
});
export default withNavigation(BasicSettingsSelector)