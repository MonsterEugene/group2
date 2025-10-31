import { Link } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import React, { useRef, useState } from 'react';
import BarGraph from '../components/graph';
// import useThemedTextStyle from '@site/src/hooks/useThemedTextStyle';
import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';


export default function Test() {
    return (
        <View style={styles.container}>
            <Text>test</Text>
            <BarGraph size={300} d={[{key:0, amo: 1}, {key:1, amo: 5}, {key:2, amo: 6},{key:3, amo: 0}, {key:4, amo: 6}, {key:5, amo: 6}]}></BarGraph>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignContent: '',
    },
    headerContainer: {
        flex: 1,
        backgroundColor: '#4e4e4eff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 32,
        fontFamily: 'Arial',
        color: '#ffffffff'
    },
    bodyContainer: {
        flex: 5,
        backgroundColor: '#6d6d6dff',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})