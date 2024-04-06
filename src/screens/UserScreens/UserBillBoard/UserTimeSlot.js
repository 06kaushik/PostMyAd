import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView, Switch, StyleSheet, ToastAndroid, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../../constant/Images";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import TimeSlot from "../../../Data/UserData/TimeSlot";
import { getAndroidId } from "react-native-device-info";
import { adminRequest } from "../AxiosInstance";

const numColumns = 2;

const TimeSlotScreen = ({ navigation, route }) => {

    const [selectTime, setSelectTime] = useState(null)
    console.log('select timedd', selectTime);
    const [amount, setAmount] = useState(null)
    const [time, setTime] = useState(null)
    const [timeSlotData, setTimeSlotData] = useState([])
    console.log('TIMEEEEEEEEEEE DATAAAAAAAadafsdffsterterter>>', timeSlotData[0]?.timeslots[0].secondsLeft);
    const { billBoardName } = route.params
    const { scheduleDate } = route.params

    const { duration } = route.params
    const { address } = route.params
    const { basePrice } = route.params
    const { billData } = route.params
    const { billBoardData } = route.params


    const { name } = route.params
    const { about } = route.params
    const { min } = route.params
    const { startscheduleDate } = route.params




    const EarlyMorning = ({ item }) => {
        // console.log('ITEEEMMMMMMMMMMMkkk', item);

        return (
            <View style={{ flex: 1 }}>
                {item.ownedBy === true && item.time > 3 && item.time < 8 ?

                    <View>
                        {new Date().toISOString().slice(0, 10) == startscheduleDate && moment().format('H') > item.time ?
                            <View style={{ borderWidth: 2, borderColor: '#DDDDDD', backgroundColor: '#DDDDDD', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{item.time === 0 ? "12-1 AM" : item.time === 11 ? `${item.time} - ${item.time + 1} PM` : `${item.time} - ${item.time + 1} AM`} </Text>
                                <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                <View>
                                    <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                </View>
                            </View>

                            :
                            <TouchableOpacity onPress={() => { setSelectTime(item.time); setAmount(item.finalprice) }}>
                                {item.time === selectTime ?
                                    <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: '#5FCA5D', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{item.time === 0 ? "12-1 AM" : item.time === 11 ? `${item.time} - ${item.time + 1} PM` : `${item.time} - ${item.time + 1} AM`} </Text>

                                        <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                        <View>
                                            <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                        </View>
                                    </View>
                                    :
                                    duration > item?.secondsLeft ?
                                        <TouchableOpacity onPress={() => ToastAndroid.show("Select Different Repetition", ToastAndroid.LONG, ToastAndroid.CENTER)}>
                                            <View style={{ borderWidth: 2, borderColor: 'red', backgroundColor: 'white', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                                <Text style={{ color: 'red', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{item.time === 12 ? `${12} - ${1} PM` : `${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                                <View style={{ borderWidth: 1, borderColor: 'red', marginLeft: 10 }} />
                                                <View>
                                                    <Text style={{ left: 8, color: 'red', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        :

                                        <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: 'white', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                            <Text style={{ color: '#5FCA5D', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{item.time === 0 ? "12-1 AM" : item.time === 11 ? `${item.time} - ${item.time + 1} PM` : `${item.time} - ${item.time + 1} AM`} </Text>

                                            <View style={{ borderWidth: 1, borderColor: '#5FCA5D', marginLeft: 10 }} />
                                            <View>
                                                <Text style={{ left: 8, color: '#5FCA5D', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                            </View>
                                        </View>
                                }
                            </TouchableOpacity>
                        }
                    </View>
                    :
                    null
                }

            </View>
        )
    }




    const TimeMorning = ({ item }) => {

        return (
            <View style={{ flex: 1 }}>
                {item.ownedBy === true && item.time > 7 && item.time < 12 ?

                    <View>
                        {new Date().toISOString().slice(0, 10) == startscheduleDate && moment().format('H') > item.time ?
                            <View style={{ borderWidth: 2, borderColor: '#DDDDDD', backgroundColor: '#DDDDDD', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{item.time === 0 ? "12-1 AM" : item.time === 11 ? `${item.time} - ${item.time + 1} PM` : `${item.time} - ${item.time + 1} AM`} </Text>
                                <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                <View>
                                    <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                </View>
                            </View>

                            :

                            <TouchableOpacity onPress={() => { setSelectTime(item.time); setAmount(item.finalprice) }}>
                                {item.time === selectTime ?
                                    <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: '#5FCA5D', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{item.time === 0 ? "12-1 AM" : item.time === 11 ? `${item.time} - ${item.time + 1} PM` : `${item.time} - ${item.time + 1} AM`} </Text>
                                        <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                        <View>
                                            <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                        </View>
                                    </View>
                                    :
                                    duration > item?.secondsLeft ?
                                        <TouchableOpacity onPress={() => ToastAndroid.show("Select Different Repetition", ToastAndroid.LONG, ToastAndroid.CENTER)}>
                                            <View style={{ borderWidth: 2, borderColor: 'red', backgroundColor: 'white', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                                <Text style={{ color: 'red', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{item.time === 12 ? `${12} - ${1} PM` : `${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                                <View style={{ borderWidth: 1, borderColor: 'red', marginLeft: 10 }} />
                                                <View>
                                                    <Text style={{ left: 8, color: 'red', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>


                                        :

                                        <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: 'white', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                            <Text style={{ color: '#5FCA5D', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{item.time === 0 ? "12-1 AM" : item.time === 11 ? `${item.time} - ${item.time + 1} PM` : `${item.time} - ${item.time + 1} AM`} </Text>
                                            <View style={{ borderWidth: 1, borderColor: '#5FCA5D', marginLeft: 10 }} />
                                            <View>
                                                <Text style={{ left: 8, color: '#5FCA5D', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                            </View>
                                        </View>
                                }
                            </TouchableOpacity>
                        }
                    </View>
                    :
                    null
                }

            </View>
        )
    }

    const TimeAfterNoon = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                {item.ownedBy === true && item.time > 11 && item.time < 16 ?

                    <View>
                        {new Date().toISOString().slice(0, 10) == startscheduleDate && moment().format('H') > item.time ?
                            <View style={{ borderWidth: 2, borderColor: '#DDDDDD', backgroundColor: '#DDDDDD', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{item.time === 12 ? `${12} - ${1} PM` : `${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                <View>
                                    <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                </View>
                            </View>

                            :
                            <TouchableOpacity onPress={() => { setSelectTime(item.time); setAmount(item.finalprice) }}>
                                {item.time === selectTime ?
                                    <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: '#5FCA5D', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{item.time === 12 ? `${12} - ${1} PM` : `${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                        <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                        <View>
                                            <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                        </View>
                                    </View>
                                    :
                                    duration > item?.secondsLeft ?
                                        <TouchableOpacity onPress={() => ToastAndroid.show("Select Different Repetition", ToastAndroid.LONG, ToastAndroid.CENTER)}>
                                            <View style={{ borderWidth: 2, borderColor: 'red', backgroundColor: 'white', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                                <Text style={{ color: 'red', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{item.time === 12 ? `${12} - ${1} PM` : `${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                                <View style={{ borderWidth: 1, borderColor: 'red', marginLeft: 10 }} />
                                                <View>
                                                    <Text style={{ left: 8, color: 'red', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: 'white', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                            <Text style={{ color: '#5FCA5D', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{item.time === 12 ? `${12} - ${1} PM` : `${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                            <View style={{ borderWidth: 1, borderColor: '#5FCA5D', marginLeft: 10 }} />
                                            <View>
                                                <Text style={{ left: 8, color: '#5FCA5D', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                            </View>
                                        </View>
                                }
                            </TouchableOpacity>
                        }
                    </View>
                    :
                    null
                }
            </View>
        )
    }

    const TimeEve = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                {item.ownedBy === true && item.time > 15 && item.time < 20 ?

                    <View>
                        {new Date().toISOString().slice(0, 10) == startscheduleDate && moment().format('H') > item.time ?
                            <View style={{ borderWidth: 2, borderColor: '#DDDDDD', backgroundColor: '#DDDDDD', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{`${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                <View>
                                    <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                </View>
                            </View>

                            :

                            <TouchableOpacity onPress={() => { setSelectTime(item.time); setAmount(item.finalprice) }}>
                                {item.time === selectTime ?
                                    <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: '#5FCA5D', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{`${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                        <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                        <View>
                                            <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                        </View>
                                    </View>
                                    :
                                    duration > item?.secondsLeft ?
                                        <TouchableOpacity onPress={() => ToastAndroid.show("Select Different Repetition", ToastAndroid.LONG, ToastAndroid.CENTER)}>
                                            <View style={{ borderWidth: 2, borderColor: 'red', backgroundColor: 'white', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                                <Text style={{ color: 'red', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{item.time === 12 ? `${12} - ${1} PM` : `${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                                <View style={{ borderWidth: 1, borderColor: 'red', marginLeft: 10 }} />
                                                <View>
                                                    <Text style={{ left: 8, color: 'red', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        :

                                        <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: 'white', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                            <Text style={{ color: '#5FCA5D', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{`${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                            <View style={{ borderWidth: 1, borderColor: '#5FCA5D', marginLeft: 10 }} />
                                            <View>
                                                <Text style={{ left: 8, color: '#5FCA5D', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                            </View>
                                        </View>
                                }


                            </TouchableOpacity>
                        }


                    </View>


                    :
                    null}
            </View>

        )
    }

    const TimeNight = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                {item.ownedBy === true && item.time > 19 ?

                    <View>
                        {new Date().toISOString().slice(0, 10) == startscheduleDate && moment().format('H') > item.time ?
                            <View style={{ borderWidth: 2, borderColor: '#DDDDDD', backgroundColor: '#DDDDDD', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{`${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                <View>
                                    <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                </View>
                            </View>
                            :
                            <TouchableOpacity onPress={() => { setSelectTime(item.time); setAmount(item.finalprice) }}>
                                {item.time === selectTime ?
                                    <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: '#5FCA5D', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{`${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                        <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                        <View>
                                            <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                        </View>
                                    </View>
                                    :
                                    duration > item?.secondsLeft ?
                                        <TouchableOpacity onPress={() => ToastAndroid.show("Select Different Repetition", ToastAndroid.LONG, ToastAndroid.CENTER)}>
                                            <View style={{ borderWidth: 2, borderColor: 'red', backgroundColor: 'white', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                                <Text style={{ color: 'red', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{item.time === 12 ? `${12} - ${1} PM` : `${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                                <View style={{ borderWidth: 1, borderColor: 'red', marginLeft: 10 }} />
                                                <View>
                                                    <Text style={{ left: 8, color: 'red', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        :

                                        <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: 'white', height: 42, width: '93%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                            <Text style={{ color: '#5FCA5D', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{`${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                            <View style={{ borderWidth: 1, borderColor: '#5FCA5D', marginLeft: 10 }} />
                                            <View>
                                                <Text style={{ left: 8, color: '#5FCA5D', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                            </View>
                                        </View>
                                }


                            </TouchableOpacity>
                        }

                    </View>
                    :
                    null
                }
            </View>
        )
    }

    const MidNight = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                {item.ownedBy === true && item.time >= 0 && item.time < 4 ?
                    <View>
                        {new Date().toISOString().slice(0, 10) == startscheduleDate && moment().format('H') > item.time ?
                            <View style={{ borderWidth: 2, borderColor: '#DDDDDD', backgroundColor: '#DDDDDD', height: 42, width: '90%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>

                                <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{item.time === 0 ? "12-1 AM" : item.time === 11 ? `${item.time} - ${item.time + 1} PM` : `${item.time} - ${item.time + 1} AM`} </Text>

                                <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                <View>
                                    <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                </View>
                            </View>
                            :
                            <TouchableOpacity onPress={() => { setSelectTime(item.time); setAmount(item.finalprice) }}>

                                {item.time === selectTime ?
                                    <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: '#5FCA5D', height: 42, width: '90%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{item.time === 0 ? "12-1 AM" : item.time === 11 ? `${item.time} - ${item.time + 1} PM` : `${item.time} - ${item.time + 1} AM`} </Text>
                                        <View style={{ borderWidth: 1, borderColor: 'white', marginLeft: 10 }} />
                                        <View>
                                            <Text style={{ left: 8, color: 'white', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                        </View>
                                    </View>
                                    :
                                    duration > item?.secondsLeft ?
                                        <TouchableOpacity onPress={() => ToastAndroid.show("Select Different Repetition", ToastAndroid.LONG, ToastAndroid.CENTER)}>
                                            <View style={{ borderWidth: 2, borderColor: 'red', backgroundColor: 'white', height: 42, width: '90%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                                <Text style={{ color: 'red', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }} >{item.time === 12 ? `${12} - ${1} PM` : `${item.time - 12} - ${item.time - 12 + 1} PM`}</Text>
                                                <View style={{ borderWidth: 1, borderColor: 'red', marginLeft: 10 }} />
                                                <View>
                                                    <Text style={{ left: 8, color: 'red', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <View style={{ borderWidth: 2, borderColor: '#5FCA5D', backgroundColor: 'white', height: 42, width: '90%', borderRadius: 8, marginTop: 12, alignSelf: 'center', marginLeft: 16, marginRight: 16, flexDirection: 'row' }}>
                                            <Text style={{ color: '#5FCA5D', marginTop: 10, fontWeight: '500', marginLeft: 8, fontSize: 12 }}>{item.time === 0 ? "12-1 AM" : item.time === 11 ? `${item.time} - ${item.time + 1} PM` : `${item.time} - ${item.time + 1} AM`} </Text>
                                            <View style={{ borderWidth: 1, borderColor: '#5FCA5D', marginLeft: 10 }} />
                                            <View>
                                                <Text style={{ left: 8, color: '#5FCA5D', fontSize: 12, fontWeight: '500', top: 10 }}>{item.secondsLeft}s left</Text>
                                            </View>
                                        </View>
                                }


                            </TouchableOpacity>
                        }

                    </View>
                    :
                    null
                }
            </View>
        )
    }


    // const getTimelotData = async () => {
    //     try {
    //         const resp = await axios.get(`/api/timeslot/getBillBoardPrice/${billData?._id}`);
    //         setTimeSlotData(resp.data.msg)
    //     } catch (err) {
    //         // Handle Error Here
    //         console.error("error from Billboard ==> ", err);
    //     }
    // }

    const date = new Date();

    const currentDate = date.toISOString().slice(0, 10);

    const timee = date.toLocaleTimeString();

    console.log('Current Date: ' + currentDate);

    console.log('Time: ' + timee);


    useEffect(() => {
        getTimeSlotData()

    }, [])


    const getTimeSlotData = () => {
        let body =
        {
            date: currentDate,
            billboardId: billData?._id,
            videoDuration: duration
        }
        console.log('BODY TO GET TIME DATA', body);
        const requestTime = async () => {
            const resp = await adminRequest.post('/api/billBoardBooking/bookingSlot', body)
            console.log('RESPONSE FROM TIME SLOT DATA', resp.data.data);
            setTimeSlotData(resp.data.data)

        }
        requestTime()
    }




    const handleNext = () => {
        if (selectTime === null) {
            ToastAndroid.show("SELECT TIME SLOT", ToastAndroid.LONG, ToastAndroid.CENTER);
        } else {
            navigation.navigate('UserContent', {
                basePrice: basePrice,
                selectTime: selectTime,
                amount: amount,
                duration: duration,
                scheduleDate: scheduleDate,
                billBoardName: billBoardName,
                address: address,
                billData: billData,
                name: name,
                about: about,
                min: min,
                billBoardData: billBoardData
            })
        }

    }


    return (

        <View style={styles.maincontainer}>
            <View>
                <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.goBack('UserAddPost')} >
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 16, top: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white', fontSize: 18 }}>Select Time</Text>
                    </View>

                </View>
            </View>

            <View style={{ backgroundColor: 'white', elevation: 4, height: 190 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: 'black', marginLeft: 16, fontSize: 18, fontFamily: 'Oswald-Bold' }}>{billBoardName}</Text>
                        <Text style={{ color: 'black', marginLeft: 16, fontSize: 16, fontFamily: 'Oswald-SemiBold' }}>{address}</Text>
                        <View style={{ marginLeft: 8, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 8 }} source={images.calender} />
                                <Text style={{ color: 'black', margin: 5, marginLeft: 10, fontFamily: 'Oswald-Bold' }}>{scheduleDate?.toString().slice(0, 10)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 8 }} source={images.time} />
                                <Text style={{ color: 'black', margin: 5, marginLeft: 13, fontFamily: 'Oswald-Bold' }}>30 x {min}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 8, right: 4 }} source={images.clock} />
                                {selectTime > 11 ?
                                    <Text style={{ color: 'black', margin: 5, fontFamily: 'Oswald-Bold', fontSize: 14 }}>{selectTime === 12 ? `${12} - ${1} PM` : `${selectTime - 12} - ${selectTime - 12 + 1} PM`}</Text>
                                    : (selectTime === null) ?
                                        <Text style={{ color: 'rgba(183,54,248,255)', margin: 5, fontFamily: 'Oswald-Bold', fontSize: 14 }}>Pending</Text>
                                        :
                                        <Text style={{ color: 'black', margin: 5, fontFamily: 'Oswald-Bold' }}>{selectTime === 11 ? `${selectTime} - ${selectTime + 1} PM` : `${selectTime} - ${selectTime + 1} AM`}</Text>
                                }

                            </View>
                        </View>

                    </View>
                    <View>
                        <Image source={{ uri: billBoardData?.filesArr[0]?.fileurl }} style={{ width: 138, height: 117, marginRight: 16, marginTop: 12, borderRadius: 8 }} />
                        {/* <View style={{ borderRadius: 10, width: 138, height: 24, backgroundColor: 'rgba(183,54,248,255)', marginTop: 12 }}>
                            <Text style={{ textAlign: 'center', top: 1, color: 'white', fontWeight: 'bold', fontFamily: 'Oswald', }}>Full Screen</Text>
                        </View> */}
                    </View>
                </View>
            </View>
            <ScrollView>

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 12 }}>
                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: '#3C3C3C', fontFamily: 'Oswald-Bold', marginLeft: 16, fontSize: 18 }}>Select Time Slot</Text>

                    </View>
                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: '#3C3C3C', fontFamily: 'Oswald-Bold', marginLeft: 16, fontSize: 14, }}>Mid Night</Text>
                    </View>
                    <FlatList
                        data={timeSlotData[0]?.timeslots}
                        renderItem={MidNight}
                        numColumns={2}
                        ListFooterComponent={<View style={{ margin: 30 }} />}
                    />

                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: '#3C3C3C', fontFamily: 'Oswald-Bold', marginLeft: 16, fontSize: 14, }}>Early Morning</Text>
                    </View>
                    <FlatList
                        data={timeSlotData[0]?.timeslots}
                        renderItem={EarlyMorning}
                        numColumns={numColumns} />
                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: '#3C3C3C', fontFamily: 'Oswald-Bold', marginLeft: 16, fontSize: 14, }}>Morning</Text>
                    </View>
                    <FlatList
                        data={timeSlotData[0]?.timeslots}
                        renderItem={TimeMorning}
                        numColumns={numColumns} />

                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: '#3C3C3C', fontFamily: 'Oswald-Bold', marginLeft: 16, fontSize: 14, }}>Afternoon</Text>
                    </View>
                    <FlatList
                        data={timeSlotData[0]?.timeslots}
                        renderItem={TimeAfterNoon}
                        numColumns={numColumns}
                    />


                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: '#3C3C3C', fontFamily: 'Oswald-Bold', marginLeft: 16, fontSize: 14, }}>Evening</Text>
                    </View>
                    <FlatList
                        data={timeSlotData[0]?.timeslots}
                        renderItem={TimeEve}
                        numColumns={numColumns}
                    />





                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: '#3C3C3C', fontFamily: 'Oswald-Bold', marginLeft: 16, fontSize: 14, }}>Night</Text>
                    </View>
                    <FlatList
                        data={timeSlotData[0]?.timeslots}
                        renderItem={TimeNight}
                        numColumns={numColumns}
                        ListFooterComponent={<View style={{ margin: 30 }} />}
                    />
                </View>

            </ScrollView>
            <View>
                <View style={{ height: 56, width: '100%', backgroundColor: 'rgba(183,54,248,255)' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={{ marginTop: '1%' }}>
                            <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 12 }}>1 Smart BillBoard</Text>
                            <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Rs {amount}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleNext()}>

                            <Text style={{ marginRight: 24, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 10 }}>Next</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>


        </View>
    )
}

export default TimeSlotScreen;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#f7f8fd'
    },
    footerContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0


    },
    footer: {

        elevation: 50,
        height: 50,

    },
    sorttxt: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        top: 10,
        textAlign: 'center'

    },
})


