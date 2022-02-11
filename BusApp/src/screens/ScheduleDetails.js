import React from "react";
import {
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    AsyncStorage,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import {withNavigation} from "react-navigation";
import {DialogContent} from "react-native-popup-dialog";
import Dialog from "react-native-popup-dialog";
import MyView from "../components/assets/MyView";


const statusColor = {
    "ON TIME": 'green',
    "DELAYED": 'red'
};


 class ScheduleDetails extends React.Component {

     constructor() {
         super()
         this.state = {
             isLoading: true,
             routeLoaded: false,
             route: "",
             routeData:{},
             clickedStop:{},
             stopDialogVisible: false,
         }
     }

     //updates when navigating to ScheduleDetails
     async componentWillMount() {
         this.setData()
     }


     //get user that was selected on Schedule screen
     async setData() {
         let user = this.props.navigation.getParam('user', 'noUser');
         let route = user.route;
         let obj = await AsyncStorage.getItem("routes");
         obj = JSON.parse(obj);
         let routeData = obj[route];
         this.setState({isLoading: false, routeLoaded: true, route: route, routeData: routeData});
     }


     //creates view of all schedule details
     scheduleList() {
         return this.state.routeData.stops.map((stopInfo, index) => {
             return(
                 <View style={{ padding: 10}}>
                     <TouchableOpacity key={stopInfo.intersection} onPress={() => {
                         this.setState({ stopDialogVisible: true, clickedStop: stopInfo });
                     }}>
                         <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#bbb',
                             borderBottomWidth: StyleSheet.hairlineWidth}}>
                             <Text style={{flex: 1/2}} numberOfLines={1}>{stopInfo.intersection}</Text>
                             <Text style={{flex: 1/5, justifyContent: 'flex-start'}}>{stopInfo.scheduledTime}</Text>
                             <Text style={{flex: 1/5, justifyContent: 'flex-start'}}>{stopInfo.actualTime}</Text>
                         </View>
                     </TouchableOpacity>
                     <Dialog
                         visible={this.state.stopDialogVisible}
                         onTouchOutside={() => {
                             this.setState({ stopDialogVisible: false });
                         }}
                         dialogStyle={{backgroundColor:'#F5FCFF'}}
                     >
                         <DialogContent>
                             <Text>{"Stop: " + this.state.clickedStop.intersection}</Text>
                             <Text>{"Scheduled Time: " + this.state.clickedStop.scheduledTime}</Text>
                             <MyView hide={!this.state.clickedStop.arrived}>
                                 <Text>{"Actual Time: " + this.state.clickedStop.actualTime}</Text>
                             </MyView>

                         </DialogContent>
                     </Dialog>
                 </View>
             );
         });
     }




    render() {

         //waits until state is loaded before rendering details
        if (this.state.isLoading) {
            return <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>;
        }

        //renders route, bus, status headers and schedule details
        return (

            <View style={styles.container}>

                <View style={styles.headerStyle}>

                    <Text style={styles.ViewRoute}> View Schedule </Text>
                    <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Schedule')}>
                        <Image style = {{marginRight: 10}}
                               source={require('../images/back.png')} size={15}/>
                    </TouchableOpacity>

                </View>

                <View style={{flex:8/9}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                        <Text style={styles.routeInfo}> {"Route " + this.state.route} </Text>
                        <Text style={styles.routeInfo}> {"Bus " + this.state.routeData.bus} </Text>
                        <Text style={{fontSize: 16, color: statusColor[this.state.routeData.status], marginEnd: 10}}>
                            {this.state.routeData.status}</Text>
                    </View>

                    <View style={{justifyContent:'center', alignSelf: 'center', padding: 10}}>
                        <Text> {this.state.routeData.timeOfDay} </Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                        <Text style={{flex: 1/2}}>Stops</Text>
                        <Text style={{flex: 1/5, justifyContent: 'flex-start'}}>Scheduled</Text>
                        <Text style={{flex: 1/5, justifyContent: 'flex-start'}}>Actual</Text>
                    </View>

                    <ScrollView>
                        {this.scheduleList()}
                    </ScrollView>

                </View>



            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },

    button: {
        //borderRadius: 1,
        //padding: 1,
        //marginBottom: 5,
        shadowColor: '#303838',
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 10,
        shadowOpacity: 0.35,
        justifyContent: 'center',
        // justifyContent: 'flex-start',
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

    routeInfo: {
        fontSize: 16,
        fontFamily: 'Helvetica',
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
        position: 'absolute',
        flex: 1/9,

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
    position: 'absolute',
    flex: 1,

    }

});


export default withNavigation(ScheduleDetails);