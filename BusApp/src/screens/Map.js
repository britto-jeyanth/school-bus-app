/**
 * Screen with Map and student information
 * made with help from https://www.youtube.com/watch?v=6ZnfsJ6mM5c
 *
 */

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage, ScrollView}
    from 'react-native';
import UsersMap from '../Map/UsersMap';
import {withNavigationFocus} from 'react-navigation';
import MyView from '../components/assets/MyView';

//sets the text color of the bus status in bottom card.
const statusColor = {
    "On Time": 'green',
    "Delayed": 'red'
}


class Map extends React.Component {

//creates fields for all of the data used in the map
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            region:{
                latitude: 33.776808,
                longitude: -84.349719,
                latitudeDelta: 0.030,
                longitudeDelta: 0.035,
            },
            userPlaces: [],
            bus: "",
            route: "",
            status: "",
            driver: "",
            userDirections: [],
            headerTitle: "View a Route",
            isHidden: true,
            listData:[],
            routeData: {},
            userBus: {

            },
            userBusPhoto: "../images/schoolbus.png"
        }

        this.setData();

    }

// puts the following information into async storage
    async setData() {


        // sets the data for route 530, including fields like bus status, time of day, stops, and stop location
        let routes = {
            "530": {
                "bus": "530",
                "status": "ON TIME",
                "timeOfDay": "MORNING",
                "stops": [
                    {
                        "intersection": "AVERY DR NE & E PARK LN NE",
                        "scheduledTime": "7:08 AM",
                        "actualTime": "7:09 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "MADDOX DR NE & POLO DR NE",
                        "scheduledTime": "7:09 AM",
                        "actualTime": "7:10 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "MADDOX DR NE & BARKSDALE DR NE",
                        "scheduledTime": "7:09 AM",
                        "actualTime": "7:10 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "MADDOX DR NE & THE PRADO NE",
                        "scheduledTime": "7:10 AM",
                        "actualTime": "7:12 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "THE PRADO NE & INMAN CIR NE",
                        "scheduledTime": "7:11 AM",
                        "actualTime": "7:13 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "PEACHTREE CIR NE & THE PRADO NE",
                        "scheduledTime": "7:12 AM",
                        "actualTime": "7:14 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "PEACHTREE CIR NE & 17TH ST NE",
                        "scheduledTime": "7:13 AM",
                        "actualTime": "7:15 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "YONAH DR NE & 15TH ST NE",
                        "scheduledTime": "7:15 AM",
                        "actualTime": "7:16 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "LAFAYETTE DR NE & WALKER TER NE",
                        "scheduledTime": "7:16 AM",
                        "actualTime": "",
                        "arrived": false
                    },
                    {
                        "intersection": "S PRADO NE & THE PRADO NE",
                        "scheduledTime": "7:18 AM",
                        "actualTime": "",
                        "arrived": false
                    },
                    {
                        "intersection": "WESTMINSTER DR NE & PIEDMONT RD NE",
                        "scheduledTime": "7:20 AM",
                        "actualTime": "",
                        "arrived": false
                    },
                    {
                        "intersection": "PARK LN NE & THE PRADO NE",
                        "scheduledTime": "7:20 AM",
                        "actualTime": "",
                        "arrived": false
                    },
                    {
                        "intersection": "BRIDAL PATH NE & E MORNINGSIDE DR NE",
                        "scheduledTime": "7:24 AM",
                        "actualTime": "",
                        "arrived": false
                    },
                    {
                        "intersection": "E MORNINGSIDE DR NE & PIEDMONT AVE NE",
                        "scheduledTime": "7:26 AM",
                        "actualTime": "",
                        "arrived": false
                    },
                    {
                        "intersection": "GREYSTONE PARK NE & PIEDMONT AVE NE",
                        "scheduledTime": "7:26 AM",
                        "actualTime": "",
                        "arrived": false
                    },
                    {
                        "intersection": "SCHOOL: MORNINGSIDE ELEMENTARY",
                        "scheduledTime": "7:30 AM",
                        "actualTime": "",
                        "arrived": false
                    },

                ],

                "userBus": {
                    "latitude": 33.788062,
                    "longitude": -84.380409
                },
                "region": {
                    "latitude": 33.792571,
                    "longitude": -84.369496,
                    "latitudeDelta": 0.030,
                    "longitudeDelta": 0.035,
                },
                "userDirections":
                    [

                        {

                            "latitude": 33.795863,
                            "longitude": -84.376428,
                            "id": 20,

                        },
                        {

                            "latitude": 33.795318,
                            "longitude": -84.377815,
                            "id": 21,

                        },
                        {

                            "latitude": 33.794945,
                            "longitude": -84.379209,
                            "id": 22,

                        },
                        {

                            "latitude": 33.795222,
                            "longitude": -84.381690,
                            "id": 23,

                        },
                        {

                            "latitude": 33.794723,
                            "longitude": -84.384632,
                            "id": 24,

                        },
                        {

                            "latitude": 33.793086,
                            "longitude": -84.383905,
                            "id": 25,

                        },
                        {

                            "latitude": 33.788442,
                            "longitude": -84.381249,
                            "id": 26,

                        },
                        {

                            "latitude": 33.789580,
                            "longitude": -84.378644,
                            "id": 27,

                        },
                        {

                            "latitude": 33.791454,
                            "longitude": -84.376698,
                            "id": 28,

                        },
                        {

                            "latitude": 33.793116,
                            "longitude": -84.372876,
                            "id": 29,

                        },
                        {

                            "latitude": 33.791721,
                            "longitude": -84.374247,
                            "id": 30,

                        },
                        {

                            "latitude": 33.799204,
                            "longitude": -84.362661,
                            "id": 31,

                        },
                        {

                            "latitude": 33.799386,
                            "longitude": -84.367862,
                            "id": 32,

                        },
                        {

                            "latitude": 33.800359,
                            "longitude": -84.367662,
                            "id": 33,

                        },

                    ],
                "userPlaces":
                    [
                        {

                            "latitude": 33.795840,
                            "longitude": -84.373746,
                            "id": 40,

                        },
                        {

                            "latitude": 33.795863,
                            "longitude": -84.376428,
                            "id": 41,

                        },
                        {

                            "latitude": 33.795318,
                            "longitude": -84.377815,
                            "id": 42,

                        },
                        {

                            "latitude": 33.794945,
                            "longitude": -84.379209,
                            "id": 43,

                        },
                        {

                            "latitude": 33.795222,
                            "longitude": -84.381690,
                            "id": 44,

                        },
                        {

                            "latitude": 33.794723,
                            "longitude": -84.384632,
                            "id": 45,

                        },
                        {

                            "latitude": 33.793086,
                            "longitude": -84.383905,
                            "id": 46,

                        },
                        {

                            "latitude": 33.788442,
                            "longitude": -84.381249,
                            "id": 47,

                        },
                        {

                            "latitude": 33.789580,
                            "longitude": -84.378644,
                            "id": 48,

                        },
                        {

                            "latitude": 33.791454,
                            "longitude": -84.376698,
                            "id": 49,

                        },
                        {

                            "latitude": 33.793116,
                            "longitude": -84.372876,
                            "id": 50,

                        },
                        {

                            "latitude": 33.791721,
                            "longitude": -84.374247,
                            "id": 51,

                        },
                        {

                            "latitude": 33.799204,
                            "longitude": -84.362661,
                            "id": 52,

                        },
                        {

                            "latitude": 33.799386,
                            "longitude": -84.367862,
                            "id": 53,

                        },
                        {

                            "latitude": 33.800359,
                            "longitude": -84.367662,
                            "id": 54,

                        },
                        {

                            "latitude": 33.796977,
                            "longitude": -84.353222,
                            "id": 55,

                        },
                    ]
            },

            // sets the data for route 595, including fields like bus status, time of day, stops, and stop location
            "595": {
                "bus": "595",
                "status": "DELAYED",
                "timeOfDay": "MORNING",
                "scheduledTimes": ["8:19 AM", "8:22 AM", "8:24 AM", "8:25 AM", "8:28 AM", "8:49 AM",
                    "8:50 AM"],
                "actualTimes": ["8:19 AM", "8:23 AM", "8:27 AM", "8:32 AM"],
                "stops": [
                    {
                        "intersection": "CANDLER PARK DR NE & MCLENDON AVE NE",
                        "scheduledTime": "8:19 AM",
                        "actualTime": "8:19 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "485 OAKDALE RD NE & OAK POINT APTS #485",
                        "scheduledTime": "8:22 AM",
                        "actualTime": "8:23 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "NORTH AVE NE & OAKDALE RD NE",
                        "scheduledTime": "8:24 AM",
                        "actualTime": "8:27 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "FAIRVIEW RD NE & SPRINGDALE RD NE",
                        "scheduledTime": "8:25 AM",
                        "actualTime": "8:32 AM",
                        "arrived": true
                    },
                    {
                        "intersection": "855 BRIARCLIFF RD NE",
                        "scheduledTime": "8:28 AM",
                        "actualTime": "",
                        "arrived": false
                    },
                    {
                        "intersection": "SCHOOL: INMAN MIDDLE (AUDITORIUM)",
                        "scheduledTime": "8:49 AM",
                        "actualTime": "",
                        "arrived": false
                    },
                    {
                        "intersection": "773 CLEMONT DR NE (BACK ENTRANCE)",
                        "scheduledTime": "8:50 AM",
                        "actualTime": "",
                        "arrived": false
                    },
                ],

                "userBus": {
                    "latitude": 33.782082,
                    "longitude": -84.355910
                },
                "userPlaces":
                    [
                        {

                            "latitude": 33.764880,
                            "longitude": -84.339422,
                            "id": 1,

                        },
                        {

                            "latitude": 33.767747,
                            "longitude": -84.341514,
                            "id": 2,

                        },
                        {

                            "latitude": 33.771205,
                            "longitude": -84.341650,
                            "id": 3,

                        },
                        {

                            "latitude": 33.772748,
                            "longitude": -84.343895,
                            "id": 4,

                        },
                        {

                            "latitude": 33.777368,
                            "longitude": -84.346172,
                            "id": 5,

                        },
                        {

                            "latitude": 33.782116,
                            "longitude": -84.361984,
                            "id": 6,

                        },

                        {

                            "latitude": 33.782922,
                            "longitude": -84.362089,
                            "id": 7,

                        },


                    ],
                "region": {
                    "latitude": 33.776804,
                    "longitude": -84.349713,
                    "latitudeDelta": 0.030,
                    "longitudeDelta": 0.035,
                },
                "userDirections":
                    [

                        {

                            "latitude": 33.767747,
                            "longitude": -84.341514,
                            "id": 10,

                        },
                        {

                            "latitude": 33.771205,
                            "longitude": -84.341650,
                            "id": 11,

                        },
                        {

                            "latitude": 33.772748,
                            "longitude": -84.343895,
                            "id": 12,

                        },
                        {

                            "latitude": 33.777368,
                            "longitude": -84.346172,
                            "id": 13,

                        },
                        {

                            "latitude": 33.782116,
                            "longitude": -84.361984,
                            "id": 14,

                        },


                    ]
            }
        }

        //puts the route information above into async storage to be retrieved later
        AsyncStorage.setItem('routes', JSON.stringify(routes));

        const users = [];
        let count = 0;
        let keys = await AsyncStorage.getAllKeys();
        for (let inKey of keys) {
            if(inKey.includes("user")) {
                let obj = await AsyncStorage.getItem(inKey);
                obj = JSON.parse(obj);
                if (obj.name != null) {
                    users.push(obj);
                    count++;
                }
            }
        }

        //updates the count of users
        let userCount = {
            "count": count,
        }
        AsyncStorage.setItem('countUsers', JSON.stringify(userCount));

        // updates state fields of listData and routeData to the users array and route object in async storage
        this.setState({isLoading: false, listData : users, routeData: routes, region: this.state.region,
            studentPhotos: this.state.studentPhotos, userPlaces: this.state.userPlaces,
            userDirections: this.state.userDirections, headerTitle: this.state.headerTitle,
            isHidden: this.state.isHidden});
    };

    //updates the array of user buttons as users are added
    async setList() {
        const users = [];
        let count = 0;

        let keys = await AsyncStorage.getAllKeys();
        for (let inKey of keys) {
            if(inKey.includes("user")) {
                let obj = await AsyncStorage.getItem(inKey);
                obj = JSON.parse(obj);
                if (obj.name != null)
                    users.push(obj);
                    count++;
            }
        }
        let userCount = {
            "count": count,
        }
        AsyncStorage.setItem('countUsers', JSON.stringify(userCount));
        this.setState({listData : users, });
    };

    //updates information when map tab is clicked from another tab
    async componentDidUpdate (previousProps) {
        if (!previousProps.isFocused && this.props.isFocused) {
            this.setList()
        }
    }

    //creates an array of buttons with user photos that tie to specific routes and cards
    buttonsListArr() {
        return this.state.listData.map((buttonInfo) => {

            return (
                <TouchableOpacity key={buttonInfo.id} style={styles.buttonb} onPress={() =>
                    this.setState({
                        isHidden: buttonInfo.isHidden, headerTitle: buttonInfo.headerTitle,
                        userBus: this.state.routeData[buttonInfo.route].userBus,
                        userPlaces: this.state.routeData[buttonInfo.route].userPlaces,
                        region: this.state.routeData[buttonInfo.route].region,
                        userDirections: this.state.routeData[buttonInfo.route].userDirections,
                        bus: buttonInfo.bus,
                        route: buttonInfo.route,
                        status: buttonInfo.status,
                        driver: buttonInfo.driver,
                    })}>
                    <Image style={{width: 50, height:50, borderRadius: 25}} source={buttonInfo.avatarSource}/>
                    <Text style={[styles.ViewRoute, {fontSize: 15}, {textAlign: 'center'}]}>{buttonInfo.name}</Text>
                </TouchableOpacity>
            );
        });
    }

    render() {
        //waits to render the screen until the data fields have loaded
        if (this.state.isLoading) {
            return <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>;
        }

        //sets the data in the screen when there are no children added
        let list = this.props.navigation.getParam('list', 'noList');
        if(list === [])
        {
            this.setState({
                region:{
                    latitude: 43.776808,
                    longitude: -84.349719,
                    latitudeDelta: 0.030,
                    longitudeDelta: 0.035,
                },
                userPlaces: [],
                bus: "",
                route: "",
                status: "",
                driver: "",
                userDirections: [],
                headerTitle: "View a Route",
                isHidden: true,
                listData:[],
                userBus: {

                },
            });

            list = null;
        }


        return (

            <View style = {styles.container}>

                {/*renders the header text*/}
                <View style={styles.headerStyle}>
                    <Text style={styles.ViewRoute}> {this.state.headerTitle} </Text>
                </View>

                {/*renders the children photo buttons*/}
                <View style={styles.buttonContainer}>
                    <ScrollView horizontal={true}>
                        {this.buttonsListArr()}
                    </ScrollView>
                </View>

                {/*renders the map component created in UsersMap.js*/}
                <UsersMap
                    userPlaces = {this.state.userPlaces}
                    userDirections = {this.state.userDirections}
                    region={this.state.region}
                    userBus={this.state.userBus}
                    userBusPhoto={this.state.userBusPhoto}
                />

                {/*renders the card of bus information, using a view component from MyView.js to show/hide card*/}
                <MyView hide={this.state.isHidden} style={[{borderTopWidth: 1},{borderTopColor: 'grey'}, {flex: 1/8},
                    {flexDirection: 'column'}, {justifyContent:'space-between'} ] }>

                    <View style={[{justifyContent: 'space-between'}, {flexDirection: 'row',}, {marginLeft: 4},
                        {marginRight: 4} ]}>
                        <Text style={styles.cardWords}> {"Bus " + this.state.bus} </Text>
                        <Text style={styles.cardWords}> {"Route " + this.state.route} </Text>
                    </View>

                    <View style={[{justifyContent: 'space-between'}, {flexDirection: 'row',}, {marginLeft: 4}, {marginRight: 4}]}>
                        <Text style={styles.cardWords}> {"Driver: " + this.state.driver} </Text>
                        <Text style={styles.cardWords}> {this.state.headerTitle} </Text>
                    </View>

                    <View style={[{marginLeft: 4}, {marginRight: 4}]}>
                        <Text style={{textAlign: 'left',
                            color: statusColor[this.state.status],
                            fontSize: 15,
                            fontFamily: 'Helvetica',}}> {"Status: " + this.state.status} </Text>
                    </View>

                </MyView>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',

    },

    buttonb: {
        padding: 10,
        shadowColor: '#303838',
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 10,
        shadowOpacity: 0.35,
        justifyContent: 'center',
    },

    ViewRoute: {
        color: '#8658B2',
        fontSize: 22,
        fontFamily: 'Helvetica',
    },

    cardWords: {
        textAlign: 'left',
        color: 'black',
        fontSize: 15,
        fontFamily: 'Helvetica',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    headerStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 10,
        alignItems: 'flex-end',
        backgroundColor: '#F5FCFF',
        flex: 1/9.8,

    },
});

export default withNavigationFocus(Map);