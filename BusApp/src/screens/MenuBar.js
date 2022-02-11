/**
 * Main navigation Screen that has the bottom tab bar of icons, and navigation to different screens within an icon
 * made with help from https://facebook.github.io/react-native/
 *
 */

import React from 'react';
import {Image} from 'react-native';
import SettingsScreen from './Settings';
import Student from './Student'
import {createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import Map from './Map';
import Chat from './Chat';
import Schedule from './Schedule';
import Notifications from './NotificationSelector'
import { Icon } from 'react-native-elements';
import BasicSettingsSelector from './BasicSettingsSelector'
import Inbox from "./Inbox";
import ScheduleDetails from "./ScheduleDetails";
import NotificationDetails from "./NotificationDetails";

//creates a switch navigator that allows navigation to different screens within the Settings icon on the tab bar
export const SettingsStack = createSwitchNavigator({

    Settings: {
        screen: SettingsScreen,
    },
    Student: {
        screen: Student,
    },
    Notifications: {
        screen: Notifications,
    },
    BasicSettingsSelector: {
        screen: BasicSettingsSelector
    },
    NotificationDetails: {
        screen: NotificationDetails
    },

    headerMode: 'none'
});

//creates a switch navigator that allows navigation to different screens within the Schedule icon on the tab bar
export const ScheduleStack = createSwitchNavigator({

    Schedule: {
        screen: Schedule,
    },
    Details: {
        screen: ScheduleDetails,
    },

    headerMode: 'none'
});

//creates a switch navigator that allows navigation to different screens within the Inbox icon on the tab bar
export const InboxStack = createSwitchNavigator({
    Inbox: {
        screen: Inbox,
    },
    Chat: {
        screen:Chat,
    }
})


// creates a tab bar at the bottom of screens with icons for Map, Schedule, Settings, and Inbox that allows navigation
// between them
const menuBar = createBottomTabNavigator({

        Map: {
            screen: Map,
            navigationOptions:{
                tabBarLabel:'Map',
                //https://github.com/react-navigation/react-navigation/issues/1769 used to change color of image based
                //on if active or not
                tabBarIcon: ({ focused }) =>  (
                    focused
                        ? <Image source={require('../components/assets/icon/map/realactive.png')} size={25}  />
                        : <Image source={require('../components/assets/icon/map/inactive.png')} size={25}  />
                )
            },
        },

        Schedule: {
            screen: ScheduleStack,
            navigationOptions: {
                tabBarLabel: 'Schedule',
                tabBarIcon: ({tintColor}) => (
                <Icon
                    name="list"
                    color={tintColor}
                    size={30}
                />
                )
            },
        },

        Settings: {
            screen: SettingsStack,
            navigationOptions: {
                tabBarLabel: 'Settings',

                //https://github.com/react-navigation/react-navigation/issues/1769 used to change color of image based
                //on if active or not
                tabBarIcon: ({focused}) => (
                    focused
                        ? <Image source={require('../components/assets/icon/settings/active.png')} size={25}/>
                        : <Image source={require('../components/assets/icon/settings/realinactive.png')} size={25}/>
                )

            },
        },
        Inbox: {
            screen: InboxStack,
            navigationOptions: {
                tabBarLabel: 'Inbox',
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        name="mail"
                        color={tintColor}
                        size={25}
                    />
                )
            },
        },

    },
    {
        tabBarOptions: {
            activeTintColor: '#8658B2',
            inactiveTintColor: '#BEA9D8',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#F5FCFF',
                borderTopColor: '#8658B2',
                borderTopWidth: 1,
            },
        }
    })
export default menuBar;