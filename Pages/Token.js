import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Heading } from '../General/Heading';
import { TokenCard } from '../General/TokenCard';
import { StateContext } from '../Redux/GlobalStateContext';

export function Tokens(props) {
    const {state} = useContext(StateContext);

    function renderItem({item}) {
        return(
            <TokenCard item={item} address={props.route.params.address} navigation={props.navigation} />
        );
    }


    return(
        <View style={style.view}>
            <Heading>
                NFT Tokens for wallet address: {props.route.params?.address}
            </Heading>
            <FlatList style={style.flat} data={state.tokens.resp} renderItem={renderItem} keyExtractor={token => token?.contractAddress} />
        </View>
    );

    
}

const style = StyleSheet.create({
    view: {
        padding: 20,
    },
    flat: {
        marginTop: 10
    }
})