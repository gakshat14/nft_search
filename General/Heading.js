import React from 'react';
import {Text} from 'react-native';

// accepts header size by defining property size

const initialProps = {
    size: '30',
    children: undefined
};

export function Heading(props = initialProps) {
    return(
        <Text style={{fontSize: props.size}}>
            {props.children}
        </Text>
    );
}