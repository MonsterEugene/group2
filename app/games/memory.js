import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState, useRef } from 'react';

const initialButtons = [
    { id: '1', text: '' }, { id: '2', text: '' }, { id: '3', text: '' }, { id: '4', text: '' },
    { id: '5', text: '' }, { id: '6', text: '' }, { id: '7', text: '' }, { id: '8', text: '' },
    { id: '9', text: '' }, { id: '10', text: '' }, { id: '11', text: '' }, { id: '12', text: '' },
    { id: '13', text: '' }, { id: '14', text: '' }, { id: '15', text: '' }, { id: '16', text: '' },
    { id: '17', text: '' }, { id: '18', text: '' }, { id: '19', text: '' }, { id: '20', text: '' },
    { id: '21', text: '' }, { id: '22', text: '' }, { id: '23', text: '' }, { id: '24', text: '' },
    { id: '25', text: '' }, { id: '26', text: '' }, { id: '27', text: '' }, { id: '28', text: '' },
    { id: '29', text: '' }, { id: '30', text: '' }, { id: '31', text: '' }, { id: '32', text: '' },
    { id: '33', text: '' }, { id: '34', text: '' }, { id: '35', text: '' },
];

export default function Memory() {
    const [buttons, setButtons] = useState(initialButtons);
    const [gameRunning, setGameRun] = useState(false);
    const [stocks, setStocks] = useState(3);
    const [nums, setNums] = useState(['1', '2', '3', '4']);

    const currentNumRef = useRef(0); 

    const delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const updateButtonText = (id, newText) => {
        setButtons(prevButtons =>
            prevButtons.map(button =>
                button.id === String(id) ? { ...button, text: newText } : button
            )
        );
    };

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const setNumber = () => {
        const randomButtonId = getRandomInt(1, 35);
        const textToShow = nums[currentNumRef.current];
        updateButtonText(randomButtonId, textToShow);
        currentNumRef.current++;
    };
    
    const startRound = async () => {
        currentNumRef.current = 0;
        setButtons(initialButtons); 
        for (let i = 0; i < nums.length; i++) {
            setNumber(); 
        }

        await delay(3000)

        setButtons(prevButtons =>
            prevButtons.map(button =>
                
            )
        )
    }

    const startGame = async () => {
        if (!gameRunning) {
            setGameRun(true);
            

        }
    };

  return (
    <View style={styles.container}>
        <View style={styles.gameboard}>
            {buttons.map((button) => (
                <Pressable
                    key={button.id}
                    onPress={() => {
                        console.log(`Button ${button.id} pressed`);
                    }}
                    style={({ pressed }) => [
                        styles.button,
                        {
                        // backgroundColor: pressed ? '#ddd' : '#ffffffff'
                        },
                    ]}
                >
                    {button.text !== '' && (
                        <Text style={styles.number}>{button.text}</Text>
                    )}
                </Pressable>
            ))}
        </View>
        <Pressable
            onPress={() => {
                startGame()
            }}
            style={({ pressed }) => [
                styles.start,
                {
                    backgroundColor: pressed ? '#78f054e8' : '#52e924ff'
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
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
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
    },
    number: {
        fontSize: 50,
        color: '#000000ff'
    },
    cover: {
        height: 74,
        width: 74,
        backgroundColor: '#c4c4c4ff'
    }
});
