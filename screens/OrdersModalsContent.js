import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const OrderScreen =() => {
    const [selectedTab, setSelectedTab] = useState('Online Orders');

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('Online Orders')}>
                    <Text style={[styles.tabText, selectedTab === 'Online Orders' && styles.selectedTabText]}>Online Orders</Text>
                    {selectedTab === 'Online Orders' && <View style={styles.underline} />}
                </TouchableOpacity>

                <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('Store Receipts')}>
                    <Text style={[styles.tabText, selectedTab === 'Store Receipts' && styles.selectedTabText]}>Store Receipts</Text>
                    {selectedTab === 'Store Receipts' && <View style={styles.underline} />}
                </TouchableOpacity>
            </View>
            
            <View style={styles.errorBox}>
                <Text style={styles.errorMessage}>We can't process your order right now.</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        alignContent: 'center',
        flex: 1,
        width: '100%',
    },
    tabContainer: {
        marginTop: 30,
        flexDirection: 'row',
    },
    tab:{
        marginHorizontal: 15,
        alignItems: 'center',
    },
    tabText:{
        fontSize: 16,
        color: 'grey',
    },
    selectedTab: {
        color: 'red',
    },
    underline:{
        height: 2,
        width: 100,
        backgroundColor: 'red',
        marginTop: 5,
    },
    errorBox: {
        marginTop:20,
        padding:15,
        backgroundColor: 'red',
    },
    errorMessage:{
        color: 'white',
        fontSize: 16,
    },


});














export default OrderScreen;