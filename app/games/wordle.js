import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, TextInput, Keyboard } from 'react-native';

const WORDS = ['PIANO', 'LIGHT', 'STORM', 'BRAVE', 'CRANE', 'SLATE', 'ABOUT', 'STEAL', 'GREAT', 'PLANT'];
//we can add more wrods for funsies 
const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export default function App() {
  const [target, setTarget] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleEnter = () => {
    if (current.length !== WORD_LENGTH) {
      showMessage('Not enough letters!');
      return;
    }

    const newGuesses = [...guesses, current];
    setGuesses(newGuesses);
    setCurrent('');

    if (current === target) {
      setGameOver(true);
      showMessage('You won111!!!');
      Keyboard.dismiss();
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
      showMessage(`ur wrong the word was ${target}`);
      Keyboard.dismiss();
    }
  };

  const handleTextChange = (text) => {
    const upperText = text.toUpperCase().replace(/[^A-Z]/g, '');
    if (upperText.length <= WORD_LENGTH) {
      setCurrent(upperText);
    }
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      handleEnter();
    }
  };

  const getLetterColor = (letter, index, word) => {
    if (word[index] === target[index]) return '#6aaa64';
    if (target.includes(letter)) return '#c9b458';
    return '#787c7e';
  };

  const reset = () => {
    setTarget(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses([]);
    setCurrent('');
    setGameOver(false);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      

      {message ? (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      ) : (
        <View style={styles.messagePlaceholder} />
      )}

      <View style={styles.board}>
        {guesses.map((guess, i) => (
          <View key={i} style={styles.row}>
            {guess.split('').map((letter, j) => (
              <View
                key={j}
                style={[
                  styles.tile,
                  { backgroundColor: getLetterColor(letter, j, guess) }
                ]}
              >
                <Text style={styles.tileText}>{letter}</Text>
              </View>
            ))}
          </View>
        ))}

        {!gameOver && guesses.length < MAX_GUESSES && (
          <View style={styles.row}>
            {[...Array(WORD_LENGTH)].map((_, i) => (
              <View key={i} style={styles.tileEmpty}>
                <Text style={styles.tileTextCurrent}>{current[i] || ''}</Text>
              </View>
            ))}
          </View>
        )}

        {[...Array(MAX_GUESSES - guesses.length - (gameOver ? 0 : 1))].map((_, i) => (
          <View key={`empty-${i}`} style={styles.row}>
            {[...Array(WORD_LENGTH)].map((_, j) => (
              <View key={j} style={styles.tileEmpty} />
            ))}
          </View>
        ))}
      </View>

      {!gameOver ? (
        <View style={styles.inputContainer}>
      
          <TextInput
            style={styles.input}
            value={current}
            onChangeText={handleTextChange}
            onKeyPress={handleKeyPress}
            maxLength={WORD_LENGTH}
            autoCapitalize="characters"
            autoCorrect={false}
            autoFocus={true}
            placeholder="guess!1!!"
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity onPress={handleEnter} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Guess</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={reset} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Play Again</Text>
        </TouchableOpacity>
      )}

      
    </SafeAreaView>
  );
}
//I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    paddingTop: 20,
  },
  messageBox: {
    backgroundColor: '#1f2937',
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  messagePlaceholder: {
    height: 44,
    marginBottom: 20,
  },
  messageText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  board: {
    alignItems: 'center',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tile: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  tileEmpty: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
  },
  tileText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  tileTextCurrent: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    fontSize: 24,
  
  },
  submitButton: {
    backgroundColor: '#6aaa64',
    paddingVertical: 16,
    borderRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#6aaa64',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  resetButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  }
  //I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //I LOVE STYLINGGG1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}); 
