import { StyleSheet, Text, View, Pressable, Image, } from 'react-native';
import { useState } from 'react'; 

export default function Memory() {
    const buttons = [
        {id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}, {id: '5'}, {id: '6'}, {id: '7'},
        {id: '8'}, {id: '9'}, {id: '10'}, {id: '11'}, {id: '12'}, {id: '13'}, {id: '14'},
        {id: '15'}, {id: '16'}, {id: '17'}, {id: '18'}, {id: '19'}, {id: '20'}, {id: '21'},
        {id: '22'}, {id: '23'}, {id: '24'}, {id: '25'}, {id: '26'}, {id: '27'}, {id: '28'},
        {id: '29'}, {id: '30'}, {id: '31'}, {id: '32'}, {id: '33'}, {id: '34'}, {id: '35'},
    ]

    
  return (
    <View style={styles.container}>
        <View style={styles.gameboard}>
            {buttons.map((button) => (
            <Pressable
                key={button.id}
                onPress={() => {
                    
                }}
                style={({ pressed }) => [
                    styles.button,
                    {
                    // backgroundColor: pressed ? '#ddd' : '#ffffffff'
                    },
                ]}
                >
            </Pressable>
            ))}
        </View>
        <Pressable
            onPress={() => {

            }}
            style={({ pressed }) => [
                styles.start,
                {
                    backgroundColor: pressed ? '#6bf043ff' : '#52e924ff'
                }
            ]}
        >
            <Text style={styles.text}> Start </Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
    },
    gameboard: {
        height: 550,
        width: 800,
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderWidth: 1,
        gap: 30,
        padding: 20,
        backgroundColor: '#8f9afcff'
    },
    button: {
        height: 75,
        width: 75,
        borderWidth: 1,
    },
    start: {
        height: 40,
        width: 150,
        borderCurve: 'circular',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 25,
        color: '#000000ff',
        fontFamily: 'ui-rounded'
    }
})