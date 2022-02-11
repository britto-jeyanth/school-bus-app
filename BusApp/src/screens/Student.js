import React from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    View,
    Image,
    TouchableHighlight,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';

import {withNavigation} from "react-navigation";
import ImagePicker from "react-native-image-picker";
import ModalSelector from 'react-native-modal-selector'

//student image picker options
const options = {
    title: 'Select Student Picture',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const images = {
    blank: require('../images/blankProfile.png'),
};

//stores references to different styles of button
const buttonStyles = {
    true: 'active_button',
    false: 'disabled_button'
};


class Student extends React.Component {
    constructor(props) {
        super(props);

        this.onValueChange = this.onValueChange.bind(this);

        this.state = {
            schoolSelected: false,
            id: -1,
            headerTitle: 'Add New Student',
            switchValue: false,
            name: 'Enter Name',
            school: 'Select School',
            address: "Enter Address",
            route: 'Unknown',
            status: 'Not Running',
            driver: 'Unknown',
            avatarSource: images.blank,
            userLoaded: false
        };


    }


    //gets user from Settings.js and sets state
    setUser() {
        let user = this.props.navigation.getParam('user', 'noUser');
        this.state.id = user.id;
        this.state.address = user.address;
        this.state.name = user.name;
        this.state.school = user.school;
        this.state.route = user.route;
        this.state.status = user.status;
        this.state.driver = user.driver;
        this.state.avatarSource = user.avatarSource;
        this.state.userLoaded = true;
        if(user.school !== "Select School") {
            this.state.schoolSelected = true;
        }


    }

    render() {

        if (!this.state.userLoaded) {
            this.setUser();
        }

        //gets user and type (blank or update)
        let user = this.props.navigation.getParam('user', 'noUser');
        let type = this.props.navigation.getParam('type');
        let header = "";
        let buttonText = "";
        if (type === "blank") {
            header = "Add New Student";
            buttonText = "Add New Student"
        }
        else {
            header = user.name;
            buttonText = "Update Student"
        }
        let index = 0;
        //options for Select School dropdown menu
        const data = [
            {key: index++, label: 'Morningside Elementary School'},
            {key: index++, label: 'Inman Middle School'},
        ];

        //references from school to route
        const routes = {
            "Morningside Elementary School": "530",
            "Inman Middle School": "595",
        }

        //references from route to driver
        const drivers = {
            "530": "Henry",
            "595": "Dan",
        }

        //references from route to status
        const statuses = {
            "530": "On Time",
            "595": "Delayed"
        }

        //references from route to ETA
        const headerTitles = {
            "530": "ETA: 5 min",
            "595": "ETA: 7 min"
        }


        return (
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    <Text style={styles.ViewRoute}> {header} </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                        <Image style={{marginRight: 10}}
                               source={require('../images/back.png')} size={15}/>
                    </TouchableOpacity>
                </View>

                <View style={{backgroundColor: '#F5FCFF'}}>
                    <TouchableHighlight style={styles.profile} onPress={() => this.selectPhotoTapped()}>
                        <Image style={styles.blank} source={this.state.avatarSource}/>
                    </TouchableHighlight>

                </View>


                {/*renders user information*/}
                <View style={{backgroundColor: '#F5FCFF', flex: 0.65}}>

                    <View style={styles.frequency}>
                        <Text style={styles.DetailHeader}>Name</Text>
                        <TextInput
                            clearTextOnFocus={true}
                            returnKeyType={"done"}
                            autoCorrect={false}
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({name: text})}
                            value={this.state.name}
                        />
                    </View>
                    <View style={styles.frequency}>
                        <Text style={styles.DetailHeader}>Address</Text>
                        <TextInput
                            clearTextOnFocus={true}
                            returnKeyType={"done"}
                            autoCorrect={false}
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({address: text})}
                            value={this.state.address}
                        />
                    </View>

                    <View style={styles.frequency}>
                        <Text style={styles.DetailHeader}>School</Text>
                        {/*creates selector for student school*/}
                        <ModalSelector
                            data={data}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option) => {
                                this.setState({
                                    schoolSelected: true,
                                    school: option.label,
                                    route: routes[option.label],
                                    bus: routes[option.label],
                                    driver: drivers[routes[option.label]],
                                    status: statuses[routes[option.label]],
                                    headerTitle: headerTitles[routes[option.label]]
                                })
                            }}>
                            <TextInput
                                style={styles.textInput}
                                editable={false}
                                value={this.state.school}/>

                        </ModalSelector>
                    </View>


                    <View style={styles.frequency}>
                        <Text style={styles.DetailHeader}>Route</Text>
                        <Text style={styles.textInput}>

                            {this.state.route}

                        </Text>
                    </View>


                </View>

                <View style={{flex: 0.15}}>
                    <TouchableHighlight
                        //button is only touchable if a school has been selected
                        disabled={!this.state.schoolSelected}
                        style={styles[buttonStyles[this.state.schoolSelected]]}
                        onPress={() => this.donePress()}
                    >
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }

    //stores student photo selected by user
    selectPhotoTapped() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }


    //adds or updates student based on information given by usre
    async donePress() {
        let obj =
            {
                "id": this.state.id,
                "name": this.state.name,
                "route": this.state.route,
                "status": this.state.status,
                "school": this.state.school,
                "bus": this.state.route,
                "driver": this.state.driver,
                "address": this.state.address,
                "avatarSource": this.state.avatarSource,
                "headerTitle": this.state.headerTitle
            }

        let userName = "user" + this.state.id;
        console.log("username: ")
        console.log(userName);
        let value = await AsyncStorage.getItem(userName);
        if (value == null) {
            let userCount = {
                "count": this.state.id,
            };
            AsyncStorage.setItem("countUsers", JSON.stringify(userCount));
        }
        AsyncStorage.setItem(userName, JSON.stringify(obj));
        this.props.navigation.navigate('Settings');
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#8658B2',
        borderBottomWidth: 1,
        height: 10,
        width: '100%',
        //top: 30,
        alignItems: 'center',
        //  position: 'absolute',
        flex: 1 / 12,
    },
    ViewRoute: {
        textAlign: 'left',
        color: '#8658B2',
        fontSize: 22,
        marginBottom: 5,
        fontFamily: 'Helvetica',
    },
    DetailHeader: {
        fontSize: 22,
        marginBottom: 5,
    },
    SelectPicture: {
        fontSize: 18,
        textAlign: 'center',
        color: '#8658B2',
    },
    pictureSeparator: {
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    frequency: {
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexBasis: 80
    },
    textInput: {
        opacity: 0.6, alignItems: 'center', fontSize: 32
    },
    active_button: {
        bottom: 0,
        backgroundColor: '#EFEFF4',
        borderWidth: 0.5,
    },
    disabled_button: {
        bottom: 0,
        opacity: 0.25,
        backgroundColor: '#D3D3D3',
        borderWidth: 0.5,
    },
    buttonText: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 32,
        color: '#8658B2',
    }
});
export default withNavigation(Student)