import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
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
    // nums now represents the IDs of buttons to find, length determines difficulty
    const [nums, setNums] = useState(['1', '2', '3', '4']); 
    const [correctSequence, setCorrectSequence] = useState([]);
    const [canPress, setCanPress] = useState(false); // New state to control user input

    const userSequenceRef = useRef([]); // Ref to track user's current sequence of presses
    const currentNumRef = useRef(0);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

    const handlePress = (id) => {
        if (!canPress) return;

        const expectedId = correctSequence[userSequenceRef.current.length];

        if (String(id) === String(expectedId)) {
            // Correct press: mark the button as "pressed" (e.g., change text from '-' to '✓')
            updateButtonText(id, '✓'); 
            userSequenceRef.current.push(id);

            if (userSequenceRef.current.length === correctSequence.length) {
                // All numbers correctly pressed. Start next round.
                setCanPress(false);
                nextRound();
            }
        } else {
            // Incorrect press: handle loss of stock and restart round/game
            setCanPress(false);
            setStocks(prevStocks => {
                const newStocks = prevStocks - 1;
                if (newStocks <= 0) {
                    Alert.alert("Game Over", "You ran out of stocks!");
                    resetGame();
                } else {
                    Alert.alert("Wrong!", `You have ${newStocks} stocks left. Retrying round...`);
                    // Retry the same round immediately
                    startRound(correctSequence.length);
                }
                return newStocks;
            });
        }
    };

    const nextRound = async () => {
        await delay(1000); // Small delay after successful sequence
        // Prepare for the next round by increasing difficulty (length of nums)
        const nextRoundLength = nums.length + 1;
        
        // Generate a new array of numbers for the next round's length
        const nextNums = Array.from({ length: nextRoundLength }, (_, i) => String(i + 1));
        
        setNums(nextNums);
        startRound(nextRoundLength);
    };

    const startRound = async (roundLength) => {
        // Use the passed roundLength or current nums length if not provided
        const currentRoundLength = roundLength || nums.length; 
        
        userSequenceRef.current = [];
        setCanPress(false);
        setButtons(initialButtons); // Clear board

        const sequence = [];
        // Use a Set to ensure unique button selections
        const usedButtonIds = new Set(); 

        for (let i = 0; i < currentRoundLength; i++) {
            let randomButtonId;
            do {
                randomButtonId = getRandomInt(1, 35);
            } while (usedButtonIds.has(randomButtonId));
            
            usedButtonIds.add(randomButtonId);
            sequence.push(String(randomButtonId));
        }

        setCorrectSequence(sequence);
        
        // Reveal numbers one by one to ensure state updates
        for (let i = 0; i < sequence.length; i++) {
            updateButtonText(sequence[i], String(i + 1));
            await delay(500); // Delay between showing numbers
        }

        await delay(2000); // Wait for users to see all numbers

        // Change the text of revealed buttons to '-'
        setButtons(prevButtons =>
            prevButtons.map(button => {
                if (sequence.includes(button.id)) {
                    return { ...button, text: '-' };
                }
                return button;
            })
        );
        setCanPress(true); // Allow user input after '-' appears
    };

    const resetGame = () => {
        setGameRun(false);
        setStocks(3);
        setNums(['1', '2', '3', '4']);
        setButtons(initialButtons);
        setCorrectSequence([]);
        userSequenceRef.current = [];
        setCanPress(false);
    };

    const startGame = async () => {
        if (!gameRunning) {
            setGameRun(true);
            setStocks(3);
            // Start the first round with the initial number length
            startRound(nums.length); 
        }
    };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Stocks: {stocks}</Text>
        <View style={styles.gameboard}>
            {buttons.map((button) => (
                <Pressable
                    key={button.id}
                    onPress={() => handlePress(button.id)}
                    style={({ pressed }) => [
                        styles.button,
                        // Add visual feedback for presses if you like
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
        justifyContent: 'center',
        alignItems: 'center',
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
});
