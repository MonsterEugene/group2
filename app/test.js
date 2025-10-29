import { Link } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import React, { useRef, useState } from 'react';
// import useThemedTextStyle from '@site/src/hooks/useThemedTextStyle';
import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';


export default function Wordle() {
    return (
        <View style={styles.container}>
            <Text>test</Text>
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