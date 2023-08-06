import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants';
import Slider from './Slider';

const HomeScreen = ({naivgation}) => {
    return (
        <SafeAreaView>
            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name = 'search' size = {24} style = {styles.searchIcon}/>
                </TouchableOpacity>
                <View style = {styles.searchWrapper}>
                    <TextInput
                        style = {styles.searchWrapper}
                        value = ""
                        onPressIn = {() => naivgation.navigate("Search")}
                        placeholder = 'What are you looking for'
                    />
                </View>
                <View>
                    <TouchableOpacity style = {styles.searchBtn}>
                        <Ionicons name = 'camera-outline' size={SIZES.xLarge} color={COLORS.offwhite}/>
                    </TouchableOpacity>
                </View>
            </View>

                <ScrollView>
                    <View style={styles.headContainer}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>New Arrivals</Text>
                        {/* <TouchableOpacity>
                            <Ionicons name='ios-grid' size={24} color = {COLORS.primary}/>
                        </TouchableOpacity> */}
                        </View>
                    </View>
                    < Slider />
                </ScrollView>

                <View style={styles.headContainer2}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Categories</Text>
                        </View>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: COLORS.lightWhite,
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        height: 50
    },
    searchIcon: {
        marginHorizontal: 10,
        color: COLORS.gray,
        marginTop: SIZES.small
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        marginRight: SIZES.small,
        borderRadius: SIZES.small
    },
    searchInput: {
        width: '100',
        height: '100',
        paddingHorizontal: SIZES.small
    },
    headContainer: {
        marginLeft: 10
        // marginTop: 10,
        // marginHorizontal: 12
    },
    headContainer2: {
        marginLeft: 10,
        marginTop: 10
        // marginTop: 10,
        // marginHorizontal: 12
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTitle: {
        // fontFamily: 'semiBold',
        fontSize: SIZES.xLarge
    }

});

export default HomeScreen;
