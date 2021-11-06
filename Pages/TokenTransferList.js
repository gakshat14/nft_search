import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TokenTransactionCard } from "../General/TokenTransactionCard";
import { createAPIResource } from "../utils/constants";

export function TokenTransfer(props) {

    const {address, contractAddress} = props.route.params;

    const [tokenTransfers, setTokenTransfers] = useState(createAPIResource());

    useEffect(() =>  {
        async function fetchTokenTransfers() {
            setTokenTransfers(createAPIResource(null, true));
            try {
                const response = await fetch(`https://blockscout.com/xdai/mainnet/api?module=account&action=tokentx&address=${address}&contractaddress=${contractAddress}`, {method: 'GET'});
                const jsonOutput = await response.json();
                if(jsonOutput.status == '1') {
                    setTokenTransfers(createAPIResource(jsonOutput.result));
                } else {
                    setTokenTransfers(createAPIResource(null, false, true));
                }
                
            } catch (error) {
                console.error(error);
            }
        }

        !tokenTransfers.resp && !tokenTransfers.isFetching && !tokenTransfers.error && fetchTokenTransfers();
    });

    function renderItem({item}) {
        return(
            <TokenTransactionCard item={item} contractAddress={contractAddress} navigation={props.navigation} />
        );
    }

    
    if(tokenTransfers.isFetching) {
        return(
            <ActivityIndicator size="large" />
        )
    }

    return(
        <View style={{padding: 20}}>
            <FlatList data={tokenTransfers.resp} keyExtractor={(token) => token.tokenID} renderItem={renderItem} />
        </View>
    );
}

