import {Image, View, Picker, TouchableOpacity, Alert, StatusBar} from 'react-native';
import React from 'react';

import { Button } from 'react-native-elements';

import Onboarding from 'react-native-onboarding-swiper';
import {withNavigation} from "react-navigation";
const Square = ({ isLight, selected }) => {
    let backgroundColor;
    if (isLight) {
        backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
    } else {
        backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    }
    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
            }}
        />
    );
};

const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
const color = isLight => backgroundColor(!isLight);

const Done = ({ isLight, ...props }) => (
    <Button
        title={'Done'}
        buttonStyle={{
            backgroundColor: backgroundColor(isLight),
        }}
        containerViewStyle={{
            marginVertical: 10,
            width: 70,
            backgroundColor: backgroundColor(isLight),
        }}
        textStyle={{ color: color(isLight) }}
        onPress={() => {
            Alert.alert('done');
            StatusBar.setBarStyle('default');
        }}
        {...props}
    />
);


const Skip = ({ isLight, skipLabel, ...props }) => (
    <Button
        title={'Skip'}
        buttonStyle={{
            backgroundColor: backgroundColor(isLight),
        }}
        containerViewStyle={{
            marginVertical: 10,
            width: 70,
        }}
        textStyle={{ color: color(isLight) }}
        {...props}
    >
        {skipLabel}
    </Button>
);

const Next = ({ isLight, ...props }) => (
    <Button
        title={'Next'}
        buttonStyle={{
            backgroundColor: backgroundColor(isLight),
        }}
        containerViewStyle={{
            marginVertical: 10,
            width: 70,
            backgroundColor: backgroundColor(isLight),
        }}
        textStyle={{ color: color(isLight) }}
        {...props}
    />
);
var language;
language = '';


const Onboarding = () => (
    <Onboarding
        // DotComponent={Square}
        // NextButtonComponent={Next}
        // SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        pages={[
            {
                backgroundColor: '#fff',
                image: <Image source={require('../images/circle.png')} />,
                title: 'APS School Bus Tracking',
                subtitle: 'Welcome to the APS School Bus Tracking App',
            },
            {
                backgroundColor: '#fe6e58',
                image: <Image source={require('../images/square.png')} />,
                title: 'Bus Map',
                subtitle: 'The location of your child\'s school bus will be shown here.'
            },
            {
                backgroundColor: '#999',
                image: <Image source={require('../images/triangle.png')} />,
                title: 'Bus Route',
                subtitle: "Please select the bus route your child will be taking.",
            },
        ]}
    />
);

export default withNavigation(Onboarding);