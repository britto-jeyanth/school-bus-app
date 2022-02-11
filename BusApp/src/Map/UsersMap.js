/**
 * Map Component for Map Screen using google maps
 * made with help from https://www.youtube.com/watch?v=6ZnfsJ6mM5c
 *
 */


import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker }  from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';


const usersMap = props => {

    //creates a map that creates markers on each GPS location in the array of UserPlaces (bus stops)
    const userMarkers = props.userPlaces.map(userPlace =>
        <MapView.Marker coordinate ={userPlace} key ={userPlace.id}/>);

    // creates a map that uses the UserPlaces array for origin and destination, and userDirections array for waypoints
    // to map a bus route
    const userDirections = props.userDirections.map(userDirection =>
        <MapViewDirections
        origin={props.userPlaces[0]}
        destination={props.userPlaces[props.userPlaces.length-1]}
        waypoints = {props.userDirections}
        apikey={'AIzaSyAvhuKQ6TMxLN0tYPLQ-_wfqp2n5ltJ0g0'}
        strokeWidth={3}
        strokeColor="#8658B2"
        key ={userDirection.id}
        />);

    // creates a marker in the shape of a bus to show bus location
    const userBusPosition =
        <Marker
        coordinate={props.userBus}
        image= {require("../images/schoolbus.png")}
        />


    return (
        <View style={styles.mapContainer}>

            {/*renders each of the components that were created above onto the map*/}
            <MapView
                provider={PROVIDER_GOOGLE}
                region={props.region}
                style={styles.map}>
                {userMarkers}
                {userDirections}
                {userBusPosition}
            </MapView>

        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {

        width: '100%',
        height: 580,
        marginTop: 3,
        borderTopColor: '#8658B2',
        borderTopWidth: 1,
        position: 'relative',
        flex: 1,
    },

    map: {
        width: '100%',
        height: '100%',

    },
});

export default usersMap;