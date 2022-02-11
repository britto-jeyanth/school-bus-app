import React from "react";
import {FlatList, Image, Text, StyleSheet, TouchableOpacity, View, AsyncStorage} from "react-native";
import {withNavigation} from "react-navigation";

const statusColor = {
    "On Time": 'green',
    "Delayed": 'red'
}

class Schedule extends React.Component {

    constructor(props) {
        super(props)
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false, listData: []};

        this.setData();
    }

    //updates when Schedule tab is selected from another tab
    async componentWillUpdate() {
        this.setData();
    }

    //get users
    async setData() {
        const users = [];
        const routes = [];
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


    //render each item in list of users with school, route, bus information
    //on press, navigate to ScheduleDetails and pass selected user as param to that screen
    renderItem = ({item}) => {

        return (
            <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginBottom: 3}}
                              onPress={() => this.props.navigation.navigate('Details', {user: item})}>
                <Image style={{width: 80, height: 80, borderRadius: 40, alignSelf: 'center'}}
                       source={item.avatarSource}/>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 5}}>
                    <Text style={{fontSize: 18, color: 'black', marginBottom: 15}}>
                        {item.name}
                    </Text>
                    <Text style={{fontSize: 16, color: statusColor[item.status]}}>
                        {item.status}
                    </Text>
                    <Text style={{fontSize: 12, color: 'black'}}>
                        {"School: " + item.school}
                    </Text>
                    <Text style={{fontSize: 12, color: 'black'}}>
                        {"Route: " + item.route}
                    </Text>
                    <Text style={{fontSize: 12, color: 'black'}}>
                        {"Bus: " + item.bus + " Driver: " + item.driver}
                    </Text>

                </View>
            </TouchableOpacity>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={{height: 1, width: '100%', backgroundColor: '#8658B2', opacity: 0.10}}>
            </View>
        )
    }




    //render FlatList of users
    render() {

        return (

            <View style={styles.container}>

                <View style={styles.headerStyle}>

                    <Text style={styles.ViewRoute}> View Schedule </Text>
                </View>
                <View style={{flex: 1.14}}>
                    <FlatList
                        data={this.state.listData}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
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
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',

    },

    button: {
        shadowColor: '#303838',
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 10,
        shadowOpacity: 0.35,
        justifyContent: 'center',
    },


    bottomContainer: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        //marginBottom: -20,

    },

    ViewRoute: {
        textAlign: 'left',
        color: '#8658B2',
        fontSize: 22,
        marginTop: 0,
        marginBottom: 0,
        fontFamily: 'Helvetica',
    },

    headerStyle: {
        justifyContent: 'flex-end',
        flexDirection: 'column',
        //marginLeft:

        borderBottomColor: '#8658B2',
        borderBottomWidth: 1,
        paddingBottom: 6,
        height: 10,
        //top: -300,
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        flex: 1 / 10,

    },

    listStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        //marginLeft:
        //marginHorizontal: 10,
        borderBottomColor: '#8658B2',
        borderBottomWidth: 1,
        height: 40,
        width: '100%',
        top: 30,
        alignItems: 'center',
        //position: 'absolute',
        //flex: 1,

    }

});


export default withNavigation(Schedule);