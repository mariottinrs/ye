import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from '../node_modules/@expo/vector-icons';

export default function ExamesRealizados({ navigation }) {
    const data = [
        { id: '1', title: 'Hemograma' },
        { id: '2', title: 'Colesterol Total' },
        { id: '3', title: 'Glicose' }
    ];


    const totalHeight = data.length * ITEM_HEIGHT;

    return (
        <View style={[styles.container, { height: totalHeight }]}>
            {data.map((item, index) => (
                <View key={item.id} style={[styles.itemContainer, index === data.length - 1 && styles.lastItem]}>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <AntDesign name="right" size={24} color="black" style={styles.arrowIcon} />
                </View>
            ))}
        </View>
    );
}

const ITEM_HEIGHT = 50;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        margin:10,
        marginTop: 100
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: ITEM_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingHorizontal: 10
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5E9A81'
    },
    lastItem: {
        marginBottom: 0
    }
});