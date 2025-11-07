import { StyleSheet, Text, View, Pressable, Image, ScrollView, Button } from 'react-native';
import { useState } from 'react';
import BarGraph from "../../components/graph.js"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export default function TicTacToe() {
  const [gameBoard, setGameBoard] = useState(["-", "-", "-", "-", "-", "-", "-", "-", "-"]);
  const [claimed, setClaimed] = useState([false, false, false, false, false, false, false, false, false]);
  const [winnah, setWinnah] = useState(null);
  const [wins, setWins] = useState([0, 0]) //[player, computer]
  const [IfGraph, setIfGraph] = useState(false)

  function BottomSheet({ isOpen, toggleSheet, duration = 500, children }) {
    const { colorMode } = useColorMode();
    const height = useSharedValue(0);
    const progress = useDerivedValue(() =>
      withTiming(isOpen.value ? 0 : 1, { duration })
    );

    const sheetStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: progress.value * 2 * height.value }],
    }));

    const backgroundColorSheetStyle = {
      backgroundColor: colorMode === 'light' ? '#f8f9ff' : '#272B3C',
    };

    const backdropStyle = useAnimatedStyle(() => ({
      opacity: 1 - progress.value,
      zIndex: isOpen.value
        ? 1
        : withDelay(duration, withTiming(-1, { duration: 0 })),
    }));
  }

  const aiRng = (currentClaimed) => {
    // Collect all available indices
    const availableIndices = currentClaimed
      .map((isClaimed, index) => isClaimed ? null : index)
      .filter(index => index !== null);

    if (availableIndices.length === 0) {
      return null; // No available moves
    }

    // Pick a random index from the available ones
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    return availableIndices[randomIndex];
  };

  const checkWinCondition = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6],             // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] !== '-' && board[a] === board[b] && board[a] === board[c]) {
        // Return 1 for X win, 2 for O win
        if (board[a] == 'X') {
          let winsPlace = [...wins]
          winsPlace[0] += 1 //Add 1 to player count
          setWins(winsPlace)
          return 1
        } else {
          let winsPlace = [...wins]
          winsPlace[1] += 1 //Add 1 to robot count
          setWins(winsPlace)
          return 2
        }
      }
    }

    // Check for draw if no winner and all cells are claimed
    if (board.every(cell => cell !== '-')) {
      return 0; // Draw
    }

    return null; // Game ongoing
  }

  const reload = () => {
    setGameBoard(["-", "-", "-", "-", "-", "-", "-", "-", "-"])
    setClaimed([false, false, false, false, false, false, false, false, false])
    setWinnah(null)
  }

  const move = (x) => {
    // Only allow move if game is ongoing and cell is unclaimed
    if (winnah !== null || claimed[x]) {
      return;
    }

    let updatedGameBoard = [...gameBoard];
    let updatedClaimed = [...claimed];

    // Player X move
    updatedGameBoard[x] = "X";
    updatedClaimed[x] = true;

    // Check if X won immediately
    let winnerStatus = checkWinCondition(updatedGameBoard);
    if (winnerStatus !== null) {
      setGameBoard(updatedGameBoard);
      setClaimed(updatedClaimed);
      setWinnah(winnerStatus);
      return; // End game
    }

    // AI O move (make sure we use the most recent board/claimed state)
    const o = aiRng(updatedClaimed);

    if (o !== null) {
      updatedGameBoard[o] = "O";
      updatedClaimed[o] = true;
      winnerStatus = checkWinCondition(updatedGameBoard);
    }

    setGameBoard(updatedGameBoard);
    setClaimed(updatedClaimed);

    if (winnerStatus !== null) {
      setWinnah(winnerStatus);
    }
  };
  const getWinnerText = () => {
    if (winnah === 1) return "YOU WIN!";
    if (winnah === 2) return "YOU LOST!";
    if (winnah === 0) return "IT'S A DRAW!";
    return null
  };
  // Helper component for rendering Pressable cells
  const Cell = ({ index, onPress }) => (
    <Pressable
      onPress={onPress}
      // Styles need adjustment based on layout logic
      style={{
        ...styles.press,
        // Simplified layout offsets (you may need to tweak these based on your grid image size)
        top: Math.floor(index / 3) * 120 - 120,
        left: (index % 3) * 120 - 120,
      }}
      disabled={claimed[index] || winnah !== null} // Disable presses if claimed or game over
    >
      {claimed[index] && gameBoard[index] === 'X' && (
        <Image
          source={require('../../assets/X.png')} // Make sure this path is correct
          style={{ width: 100, height: 100 }}
        />
      )}
      {claimed[index] && gameBoard[index] === 'O' && (
        <Image
          source={require('../../assets/O.png')} // !!! You NEED this asset for the AI to show up !!!
          style={{ width: 100, height: 100 }}
        />
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>

      <View style={styles.reload}>
        <Button
          onPress={
            () => { reload() }
          }
          title="Play Again"
        />
      </View>
      <Text>
        {wins[0]} - {wins[1]}
      </Text>
      {getWinnerText() && (
        <Text style={styles.winText}>{getWinnerText()}</Text>
      )}

      <Image
        source={require('../../assets/grid.png')}
        style={styles.image}
      />

      {/* --- INDEX 0 FIX --- */}
      <Pressable
        onPress={
          () => { move(0) }
        }
        style={{ ...styles.press, marginRight: 285, marginBottom: 285 }}
      >
        {/* We use gameBoard[0] instead of claimed[0] */}
        {gameBoard[0] === 'X' && (
          <Image
            source={require('../../assets/X.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
        {/* ADDED: A check for 'O' */}
        {gameBoard[0] === 'O' && (
          <Image
            source={require('../../assets/O.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
      </Pressable>
      <Pressable
        onPress={
          () => { move(1) }
        }
        style={{ ...styles.press, marginBottom: 285 }}
      >
        {/* We use gameBoard[0] instead of claimed[0] */}
        {gameBoard[1] === 'X' && (
          <Image
            source={require('../../assets/X.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
        {/* ADDED: A check for 'O' */}
        {gameBoard[1] === 'O' && (
          <Image
            source={require('../../assets/O.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
      </Pressable>
      <Pressable
        onPress={
          () => { move(2) }
        }
        style={{ ...styles.press, marginLeft: 285, marginBottom: 285 }}
      >
        {/* We use gameBoard[0] instead of claimed[0] */}
        {gameBoard[2] === 'X' && (
          <Image
            source={require('../../assets/X.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
        {/* ADDED: A check for 'O' */}
        {gameBoard[2] === 'O' && (
          <Image
            source={require('../../assets/O.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
      </Pressable>
      <Pressable
        onPress={
          () => { move(3) }
        }
        style={{ ...styles.press, marginRight: 285 }}
      >
        {/* We use gameBoard[0] instead of claimed[0] */}
        {gameBoard[3] === 'X' && (
          <Image
            source={require('../../assets/X.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
        {/* ADDED: A check for 'O' */}
        {gameBoard[3] === 'O' && (
          <Image
            source={require('../../assets/O.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
      </Pressable>
      <Pressable
        onPress={
          () => { move(4) }
        }
        style={{ ...styles.press }}
      >
        {/* We use gameBoard[0] instead of claimed[0] */}
        {gameBoard[4] === 'X' && (
          <Image
            source={require('../../assets/X.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
        {/* ADDED: A check for 'O' */}
        {gameBoard[4] === 'O' && (
          <Image
            source={require('../../assets/O.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
      </Pressable>
      <Pressable
        onPress={
          () => { move(5) }
        }
        style={{ ...styles.press, marginLeft: 285 }}
      >
        {/* We use gameBoard[0] instead of claimed[0] */}
        {gameBoard[5] === 'X' && (
          <Image
            source={require('../../assets/X.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
        {/* ADDED: A check for 'O' */}
        {gameBoard[5] === 'O' && (
          <Image
            source={require('../../assets/O.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
      </Pressable>
      <Pressable
        onPress={
          () => { move(6) }
        }
        style={{ ...styles.press, marginRight: 285, marginTop: 285 }}
      >
        {/* We use gameBoard[0] instead of claimed[0] */}
        {gameBoard[6] === 'X' && (
          <Image
            source={require('../../assets/X.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
        {/* ADDED: A check for 'O' */}
        {gameBoard[6] === 'O' && (
          <Image
            source={require('../../assets/O.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
      </Pressable>
      <Pressable
        onPress={
          () => { move(7) }
        }
        style={{ ...styles.press, marginTop: 285 }}
      >
        {/* We use gameBoard[0] instead of claimed[0] */}
        {gameBoard[7] === 'X' && (
          <Image
            source={require('../../assets/X.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
        {/* ADDED: A check for 'O' */}
        {gameBoard[7] === 'O' && (
          <Image
            source={require('../../assets/O.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
      </Pressable>
      <Pressable
        onPress={
          () => { move(8) }
        }
        style={{ ...styles.press, marginLeft: 285, marginTop: 285 }}
      >
        {/* We use gameBoard[0] instead of claimed[0] */}
        {gameBoard[8] === 'X' && (
          <Image
            source={require('../../assets/X.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
        {/* ADDED: A check for 'O' */}
        {gameBoard[8] === 'O' && (
          <Image
            source={require('../../assets/O.png')}
            style={{ width: 100, height: 100 }}
          />
        )}
      </Pressable>
      <Button
        onPress={
          () => setIfGraph(!IfGraph)
        }
        title="Show Graph"
      />
      {IfGraph && (
        <View style={styles.graph}>
          <BarGraph size={300} d={[{ key: 0, amo: wins[0] }, { key: 1, amo: wins[1] }]}> </BarGraph>
        </View>
      )}
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity style={styles.flex} onPress={toggleSheet} />
      </Animated.View>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    justifyContent: 'center',
  },
  graph: {
    position: 'absolute',
    marginLeft: 750

  },
  scrollView: {
    backgroundColor: 'pink',
    flexGrow: 1,
  },
  reload: {
    justifyContent: 'center',
    position: 'absolute',
    marginRight: 750
  },
  press: {
    width: 100,
    height: 100,
    position: 'absolute'
  },
  winText: {
    justifyContent: 'center',
    position: 'absolute',
    fontSize: 100,
    marginBottom: 600
  },
});