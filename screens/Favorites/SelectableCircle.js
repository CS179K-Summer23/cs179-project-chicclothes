import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SelectableCircle = ({ isSelected, toggleSelection }) => {
    return (
        <TouchableOpacity 
            style={[styles.selectionButton, isSelected ? styles.selectedBackground : {}]} 
            onPress={toggleSelection}
        >
            {isSelected && <Text style={styles.checkmark}>✔️</Text>}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    selectionButton: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 2,
        marginRight: 10,
    },
    selectedBackground: {
        backgroundColor: '#333',
    },
    checkmark: {
        fontSize: 10,
        color: '#000',
    },
    selectedCheckmark: {
        fontSize: 10,
        color: '#fff',
    }
});

export default SelectableCircle;
