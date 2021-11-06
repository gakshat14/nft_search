import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, View, Text, StyleSheet } from "react-native";
import { createAPIResource } from "../utils/constants";
// import {jsdom} from 'jsdom-jscore-rn';
import cheerio from 'react-native-cheerio';

export function NFT(props) {
    const [tokenMetaHTML, setTokenMetaHTML] = useState(createAPIResource());
    const [imgURL, setImgURL] = useState(undefined);

    const {contractAddress, tokenID} = props.route.params

    useEffect(() =>  {
        async function fetchTokenMeta() {
            setTokenMetaHTML(createAPIResource(null, true));
            try {
                const response = await fetch(`https://blockscout.com/xdai/mainnet/token/${contractAddress}/instance/${tokenID}/metadata`, {method: 'GET'});
                const text = await response.text();
                const $ = cheerio.load(text);
                // const dom = await jsdom(text);
                // console.log(dom)
                setImgURL($('div.erc721-media img')[0].attribs.src ?? undefined);
                setTokenMetaHTML(createAPIResource(text, false));
            } catch (error) {
                console.error(error);
                setTokenMetaHTML(createAPIResource(null, false, true));
            }
        }

        !tokenMetaHTML.resp && !tokenMetaHTML.isFetching && !tokenMetaHTML.error && fetchTokenMeta();
    });

    if(tokenMetaHTML.isFetching) {
        return(
            <ActivityIndicator size="large" />
        );
    }

    if(tokenMetaHTML.error) {
        return(
            <Text>Unable to process your request.</Text>
        );
    }

    return(
        <>
            {imgURL ? <Image style={styles.img} height={'50%'} width={'50%'} source={{uri: imgURL}} /> : <Text>Sorry no image found</Text>}
        </>
    );
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
        marginTop: '20px'
    }
})
