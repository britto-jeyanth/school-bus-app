import React from 'react';
import {Alert, Text, StyleSheet, View, Image, TouchableHighlight, AsyncStorage} from 'react-native';
import {withNavigationFocus} from "react-navigation";
import ImagePicker from "react-native-image-picker";
import SettingsList from 'react-native-settings-list';

const images = {
    jane: require('../images/jane.png'), //placeholder image
    blank: require('../images/blankProfile.png'),
};

//profile picture image picker options
const options = {
    title: 'Select Profile Picture',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

//emptyUser is passed to Student.js if "Add New Student" setting is selected
let emptyUser = {
    id: 0,
    headerTitle: 'Add New Student',
    switchValue: false,
    name: 'Enter Name',
    school: 'Select School',
    address: "Enter Address",
    route: '---',
    status: 'Not Running',
    driver: 'Unknown',
    avatarSource: images.blank
}

//stores parent profile picture
let parent = {
    photo: images.blank
}

class Settings extends React.Component {
    constructor() {
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false, photoSelected: false, parentPhoto: images.blank, userCount: 0};
        this.setData();
    }

    //sets count of users and parent photo
    async setData() {

        let count = await AsyncStorage.getItem("countUsers");
        let parent = await AsyncStorage.getItem("parent")
        count = JSON.parse(count);
        let userCount = count.count + 1;

        this.setState({
            userCount: userCount,
        });

        if (parent != null) {
            parent = JSON.parse(parent);
            let photo = parent.photo;
            this.setState({parentPhoto: photo})
        }

        //sets empty User id to next available id number
        emptyUser.id = userCount;
    }


    //renders Settings options
    render() {
        return (
            <View style={{backgroundColor: '#F5FCFF', flex: 1}}>
                <View style={{borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc'}}>
                </View>
                <View style={styles.headerStyle}>
                    <Text style={styles.ViewRoute}> View Settings </Text>
                </View>
                <TouchableHighlight style={styles.profile} onPress={() => this.selectPhotoTapped()}>
                    <Image style={styles.blank} source={this.state.parentPhoto}/>
                </TouchableHighlight>

                <View style={{backgroundColor: '#F5FCFF', flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={50} backgroundColor={'#F5FCFF'}>
                        <SettingsList.Item
                            title='Edit Students'
                            itemWidth={70}
                            onPress={() => this.props.navigation.navigate('BasicSettingsSelector')}
                        />
                        <SettingsList.Item
                            title='Add New Student'
                            itemWidth={70}
                            onPress={() => this.props.navigation.navigate('Student', {user: emptyUser, type: "blank"})}
                        />

                        <SettingsList.Item
                            title='Notifications'
                            itemWidth={70}
                            onPress={() => this.props.navigation.navigate('Notifications')}
                        />

                        <SettingsList.Item style={{marginBottom: 30}}
                                           title='Sign Out'
                                           itemWidth={70}
                                           onPress={() => this.signOut()}
                        />
                    </SettingsList>
                </View>
            </View>
        );
    }

    onValueChange(value) {
        this.setState({switchValue: value});
    }

    //clears AsyncStorage if sign out is selected
    signOut() {
        AsyncStorage.clear();
        Alert.alert('You have successfully signed out!');
        this.props.navigation.navigate('Map', {list: []});
    }

    //sets parent photo to image selected by user
    async selectPhotoTapped() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};
                this.setState({
                    parentPhoto: source,
                });
                parent.photo = this.state.parentPhoto
                AsyncStorage.setItem("parent", JSON.stringify(parent));
            }
        });
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    imageStyle: {
        alignItems: 'center',
        width: 50,
        height: 50,
        justifyContent: 'center',

    },

    profile: {
        marginTop: 10,
        marginBottom: 20
    },

    blank: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 50
    },
    headerStyle: {
        justifyContent: 'flex-end',
        flexDirection: 'column',
        borderBottomColor: '#8658B2',
        borderBottomWidth: 1,
        height: 10,
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        flex: 1 / 8,
    },
    ViewRoute: {
        textAlign: 'left',
        color: '#8658B2',
        fontSize: 22,
        marginBottom: 5,
        fontFamily: 'Helvetica',
    },
});
export default withNavigationFocus(Settings)