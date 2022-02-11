import React from 'react';
import {Text, StyleSheet, View, Image, TouchableHighlight, TouchableOpacity} from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import {withNavigation} from "react-navigation";
import MyView from '../components/assets/MyView';
import { CheckBox } from 'react-native-elements'

class NotificationDetails extends React.Component {

    //sets state to include state of each possible notification
    constructor() {
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {
            switchValue: false,
            pushNotifications: true,
            timeDialogVisible: false,
            eventDialogVisible: false,
            MM_checked: false,
            MA_checked: false,
            TM_checked: false,
            TA_checked: false,
            WM_checked: false,
            WA_checked: false,
            RM_checked: false,
            RA_checked: false,
            FM_checked: false,
            FA_checked: false,
            SM_checked: false,
            SA_checked: false,
            NM_checked: false,
            NA_checked: false,
            arrivalChecked: false,
            delaysChecked: false,
            driverChangesChecked: false,
            fieldTripsChecked: false

        };
    }

    //change state if push notifications or text messages selected
    notificationPress(pushSelected)
    {
        if(this.state.pushNotifications !== pushSelected){
            this.setState({pushNotifications: pushSelected})
        }
    }

    //render all notification settings
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    <Text style={styles.ViewRoute}>Notifications</Text>
                    <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Notifications')}>
                        <Image style = {{marginRight: 10}}
                               source={require('../images/back.png')} size={15}/>
                    </TouchableOpacity>
                </View>


                <View style={{backgroundColor: '#F5FCFF', flex: 0.807}}>

                    <View>
                        {/*render push notifications or text message settings, put checkmark next to selected setting*/}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.DetailHeader}>Type</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.notificationPress(true)}>
                            <View style={styles.type}>
                                <Text style={styles.DetailHeader}>Push Notifications</Text>
                                <MyView hide={!this.state.pushNotifications} style={styles.checkMark}>
                                    <Image style = {{marginRight: 10}}
                                           source={require('../images/checkmark.png')} size={15}/>
                                </MyView>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.notificationPress(false)}>
                            <View style={styles.type}>
                                <Text style={styles.DetailHeader}>Text Messages</Text>
                                <MyView hide={this.state.pushNotifications} style={styles.checkMark}>
                                    <Image style = {{marginRight: 10}}
                                           source={require('../images/checkmark.png')} size={15}/>
                                </MyView>
                            </View>
                        </TouchableOpacity>

                        {/*render frequency settings, put M and/or A if morning or afternoon selected*/}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.DetailHeader}>Frequency</Text>
                        </View>
                        <View style={styles.frequency}>
                            <TouchableOpacity onPress={() => {
                                this.setState({ timeDialogVisible: true });
                            }}>

                                <Text style={styles.DetailHeader}>Days</Text>
                                <View style={{flexDirection: 'column'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 1/3}}>
                                            <MyView hide={!this.state.MM_checked && !this.state.MA_checked}>
                                                <Text style={styles.frequencyDetails}>Monday</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.MM_checked}>
                                                <Text style={styles.frequencyDetails}>M</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.MA_checked}>
                                                <Text style={styles.frequencyDetails}>A</Text>
                                            </MyView>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 1/3}}>
                                            <MyView hide={!this.state.TM_checked && !this.state.TA_checked}>
                                                <Text style={styles.frequencyDetails}>Tuesday</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.TM_checked}>
                                                <Text style={styles.frequencyDetails}>M</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.TA_checked}>
                                                <Text style={styles.frequencyDetails}>A</Text>
                                            </MyView>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 1/3}}>
                                            <MyView hide={!this.state.WM_checked && !this.state.WA_checked}>
                                                <Text style={styles.frequencyDetails}>Wednesday</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.WM_checked}>
                                                <Text style={styles.frequencyDetails}>M</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.WA_checked}>
                                                <Text style={styles.frequencyDetails}>A</Text>
                                            </MyView>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 1/3}}>
                                            <MyView hide={!this.state.RM_checked && !this.state.RA_checked}>
                                                <Text style={styles.frequencyDetails}>Thursday</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.RM_checked}>
                                                <Text style={styles.frequencyDetails}>M</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.RA_checked}>
                                                <Text style={styles.frequencyDetails}>A</Text>
                                            </MyView>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 1/3}}>
                                            <MyView hide={!this.state.FM_checked && !this.state.FA_checked}>
                                                <Text style={styles.frequencyDetails}>Friday</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.FM_checked}>
                                                <Text style={styles.frequencyDetails}>M</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.FA_checked}>
                                                <Text style={styles.frequencyDetails}>A</Text>
                                            </MyView>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 1/3}}>
                                            <MyView hide={!this.state.SM_checked && !this.state.SA_checked}>
                                                <Text style={styles.frequencyDetails}>Saturday</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.SM_checked}>
                                                <Text style={styles.frequencyDetails}>M</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.SA_checked}>
                                                <Text style={styles.frequencyDetails}>A</Text>
                                            </MyView>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 1/3}}>
                                            <MyView hide={!this.state.NM_checked && !this.state.NA_checked}>
                                                <Text style={styles.frequencyDetails}>Sunday</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.NM_checked}>
                                                <Text style={styles.frequencyDetails}>M</Text>
                                            </MyView>
                                        </View>
                                        <View style={{flex: 0.1}}>
                                            <MyView hide={!this.state.NA_checked}>
                                                <Text style={styles.frequencyDetails}>A</Text>
                                            </MyView>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/*dialog for when "Days" setting is selected*/}
                            <Dialog
                                visible={this.state.timeDialogVisible}
                                onTouchOutside={() => {
                                    this.setState({ timeDialogVisible: false });
                                }}
                                dialogStyle={{backgroundColor:'#F5FCFF'}}
                            >
                                <DialogContent>

                                        <View style={styles.dialogRow}>
                                        {/*<Text style={styles.dialogHeader}>Morning</Text>*/}
                                            <Text style={styles.dialogHeader}> Day </Text>

                                                <Text style={styles.dialogHeader}> Morning </Text>


                                                <Text style={styles.dialogHeader}> Afternoon </Text>

                                        </View>
                                        <View style={styles.dialogRow}>
                                            {/*<Text style={styles.dialogHeader}>Morning</Text>*/}
                                            <Text style={styles.dayLabel}>Monday</Text>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.MM_checked}
                                                    onPress={() => this.setState({MM_checked: !this.state.MM_checked})}
                                                />
                                            </View>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.MA_checked}
                                                    onPress={() => this.setState({MA_checked: !this.state.MA_checked})}
                                                />
                                            </View>

                                        </View>
                                        <View style={styles.dialogRow}>
                                            {/*<Text style={styles.dialogHeader}>Morning</Text>*/}
                                            <Text style={styles.dayLabel}>Tuesday</Text>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.TM_checked}
                                                    onPress={() => this.setState({TM_checked: !this.state.TM_checked})}
                                                />
                                            </View>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.TA_checked}
                                                    onPress={() => this.setState({TA_checked: !this.state.TA_checked})}
                                                />
                                            </View>

                                        </View>
                                        <View style={styles.dialogRow}>
                                            {/*<Text style={styles.dialogHeader}>Morning</Text>*/}
                                            <Text style={styles.dayLabel}>Wednesday</Text>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.WM_checked}
                                                    onPress={() => this.setState({WM_checked: !this.state.WM_checked})}
                                                />
                                            </View>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.WA_checked}
                                                    onPress={() => this.setState({WA_checked: !this.state.WA_checked})}
                                                />
                                            </View>

                                        </View>
                                        <View style={styles.dialogRow}>
                                            {/*<Text style={styles.dialogHeader}>Morning</Text>*/}
                                            <Text style={styles.dayLabel}>Thursday</Text>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.RM_checked}
                                                    onPress={() => this.setState({RM_checked: !this.state.RM_checked})}
                                                />
                                            </View>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.RA_checked}
                                                    onPress={() => this.setState({RA_checked: !this.state.RA_checked})}
                                                />
                                            </View>

                                        </View>
                                        <View style={styles.dialogRow}>
                                            {/*<Text style={styles.dialogHeader}>Morning</Text>*/}
                                            <Text style={styles.dayLabel}>Friday</Text>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.FM_checked}
                                                    onPress={() => this.setState({FM_checked: !this.state.FM_checked})}
                                                />
                                            </View>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.FA_checked}
                                                    onPress={() => this.setState({FA_checked: !this.state.FA_checked})}
                                                />
                                            </View>

                                        </View>
                                        <View style={styles.dialogRow}>
                                            {/*<Text style={styles.dialogHeader}>Morning</Text>*/}
                                            <Text style={styles.dayLabel}>Saturday</Text>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.SM_checked}
                                                    onPress={() => this.setState({SM_checked: !this.state.SM_checked})}
                                                />
                                            </View>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.SA_checked}
                                                    onPress={() => this.setState({SA_checked: !this.state.SA_checked})}
                                                />
                                            </View>

                                        </View>
                                        <View style={styles.dialogRow}>
                                            {/*<Text style={styles.dialogHeader}>Morning</Text>*/}
                                            <Text style={styles.dayLabel}>Sunday</Text>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.NM_checked}
                                                    onPress={() => this.setState({NM_checked: !this.state.NM_checked})}
                                                />
                                            </View>
                                            <View style={styles.checkBox}>
                                                <CheckBox
                                                    checkedColor='#8658B2'
                                                    checked={this.state.NA_checked}
                                                    onPress={() => this.setState({NA_checked: !this.state.NA_checked})}
                                                />
                                            </View>

                                        </View>

                                </DialogContent>
                            </Dialog>

                        </View>

                        {/*render events settings*/}
                        <View style={styles.frequency}>
                            <TouchableOpacity onPress={() => {
                                this.setState({ eventDialogVisible: true });
                            }}>

                                <Text style={styles.DetailHeader}>Events</Text>
                                <View style={{flexDirection: 'column'}}>
                                    <MyView hide={!this.state.arrivalChecked}>
                                        <Text style={styles.frequencyDetails}>Bus Arrival</Text>
                                    </MyView>
                                    <MyView hide={!this.state.delaysChecked}>
                                        <Text style={styles.frequencyDetails}>Delays</Text>
                                    </MyView>
                                    <MyView hide={!this.state.driverChangesChecked}>
                                        <Text style={styles.frequencyDetails}>Driver/Bus Changes</Text>
                                    </MyView>
                                    <MyView hide={!this.state.fieldTripsChecked}>
                                        <Text style={styles.frequencyDetails}>Field Trips</Text>
                                    </MyView>
                                </View>
                            </TouchableOpacity>
                            {/*dialog for when frequency setting is selected*/}
                            <Dialog
                                visible={this.state.eventDialogVisible}
                                onTouchOutside={() => {
                                    this.setState({ eventDialogVisible: false });
                                }}
                                dialogStyle={{backgroundColor:'#F5FCFF'}}
                            >
                                <DialogContent>
                                        <CheckBox
                                            title = "Bus Arrival"
                                            checkedColor='#8658B2'
                                            checked={this.state.arrivalChecked}
                                            onPress={() => this.setState({arrivalChecked: !this.state.arrivalChecked})}
                                        />
                                        <CheckBox
                                            title = "Delays"
                                            checkedColor='#8658B2'
                                            checked={this.state.delaysChecked}
                                            onPress={() => this.setState({delaysChecked: !this.state.delaysChecked})}
                                        />
                                        <CheckBox
                                            title = "Driver/Bus Changes"
                                            checkedColor='#8658B2'
                                            checked={this.state.driverChangesChecked}
                                            onPress={() => this.setState({driverChangesChecked: !this.state.driverChangesChecked})}
                                        />
                                        <CheckBox
                                            title = "Field Trips"
                                            checkedColor='#8658B2'
                                            checked={this.state.fieldTripsChecked}
                                            onPress={() => this.setState({fieldTripsChecked: !this.state.fieldTripsChecked})}
                                        />

                                </DialogContent>
                            </Dialog>

                        </View>

                    </View>
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

    imageStyle: {
        alignItems: 'center',
        width: 50,
        height: 50,
        justifyContent: 'center',

    },
    SectionHeader: {
        backgroundColor: '#EFEFF4',
        fontSize: 22,
        marginBottom: 5,
    },

    DetailHeader: {
        fontSize: 22,
        marginBottom: 5,
        justifyContent: 'flex-start',
        padding: 5
    },
    type: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    frequency: {
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    profile: {
        marginTop: 10,
        marginBottom: 20
    },

    frequencyDetails: {
        justifyContent: 'flex-start',
        padding: 5
    },

    dayLabel: {
        fontSize: 16,
        flex: 0.5,
        padding: 5,
        alignSelf: 'center',
        justifyContent: 'flex-start'
    },

    dialogHeader: {
        fontSize: 16,
        flex: 0.5,
        padding: 5,
        alignSelf: 'center',
    },

    dialogRow: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '75%',
        padding: 5,
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
        //marginLeft:
        //marginHorizontal: 10,
        borderBottomColor: '#8658B2',
        borderBottomWidth: 1,
        height: 40,
        width: '100%',
        top: 30,
        alignItems: 'center',
        position: 'absolute',
        flex: 1/8,

    },
    checkMark: {
        alignSelf: 'center'

    },
    checkBox: {
        flex: 0.50,

    },
    ViewRoute: {
        textAlign: 'left',
        color: '#8658B2',
        fontSize: 22,
        marginBottom: 5,
        fontFamily: 'Helvetica',
    },
});
export default withNavigation(NotificationDetails)