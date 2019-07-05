import React from 'react'
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    subDisplay: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.78)",
        alignItems: "flex-end"
    },
    displayValue: {
        fontSize: 23,
        color: "#f1f1f1"
    }
});

export default props => (
    <View style={styles.subDisplay}>
        <Text style={styles.displayValue} numberOfLines={1}>
            {props.value}
        </Text>
    </View>
);