import React, { useContext, useState } from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import { Heading } from '../General/Heading';
import { StateContext } from '../Redux/GlobalStateContext';
import filter from 'lodash/filter';
import { Actions, createAPIResource } from '../utils/constants';

export function Home(props) {
    const [searchText, onSearchText] = useState('');
    const {state, dispatch} = useContext(StateContext);

    console.log(state);

    function onChangeText(text) {
        onSearchText(text);
    }

    async function onSearchPressed() {
        dispatch({type: Actions.CHANGE_TOKENS, payload: {tokens: createAPIResource(null, true)}})
        try {
            const response = await fetch(`https://blockscout.com/xdai/mainnet/api?module=account&action=tokenlist&address=${searchText}`, {method: 'GET'});
            const jsonObject = await response.json();
            if(jsonObject.status == 1) {
                const onlyNFT = filter(jsonObject.result, ['type', 'ERC-721']);
                dispatch({type: Actions.CHANGE_TOKENS, payload: {tokens: createAPIResource(onlyNFT)}})
                props.navigation.navigate('Tokens', {address: searchText});
            } else {
                console.error('received an error')
                dispatch({type: Actions.CHANGE_TOKENS, payload: {tokens: createAPIResource(null, false, true)}})
            }
        } catch (error) {
            console.error(error)
        }
        console.log('pressed');
    }

    return(
        <View style={styles.view}>
            <Heading>
                NFT Search
            </Heading>
            <TextInput style={styles.input} placeholder="Enter wallet address" value={searchText} onChangeText={onChangeText}></TextInput>
            <Button title="Search for NFT" onPress={onSearchPressed} accessibilityLabel="Search for the NFT tokens associated with the address"></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        padding: '20px',
        display: 'flex',
        maxWidth: '60%',
        marginLeft: '20%',
    },
    input: {
        borderWidth: 1,
        lineHeight: 2,
        marginTop: '10px',
        marginBottom: '10px'
    }
})
