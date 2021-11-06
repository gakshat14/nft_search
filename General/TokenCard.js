import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export function TokenCard(props) {
    function onButtonPressed() {
        props.navigation.navigate('Token Transfers', {address: props.address, contractAddress: props.item.contractAddress});
    }
    return(
        <View style={cardStyles.view}>
            <Button title={props.item.symbol} onPress={onButtonPressed} />
            <Text>{props.item.name}</Text>
            <Text>Contract Address: {props.item.contractAddress}</Text>
        </View>
    )
}

export const cardStyles = StyleSheet.create({
    view: {
        marginTop: '10px',
        borderWidth: 0.5
    }
})