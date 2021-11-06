import React from "react";
import { Button, View, Text } from "react-native";
import { cardStyles } from "./TokenCard";

export function TokenTransactionCard(props) {
    function onButtonPressed() {
        props.navigation.navigate('NFT Image', {contractAddress: props.item.contractAddress, tokenID: props.item.tokenID});
    }
    return(
        <View style={cardStyles.view}>
            <Button title={props.item.tokenID} onPress={onButtonPressed} />
            <Text>Block Number: {props.item.blockNumber}</Text>
            <Text>Block Hash: {props.item.blockHash}</Text>
        </View>
    );
}
