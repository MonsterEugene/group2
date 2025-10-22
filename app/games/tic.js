import { StyleSheet, Text, View, Button, Pressable, } from 'react-native';

export default function TicTacToe() {
  const [gameBoard, setGameBoard] = useState(["-", "-", "-", "-", "-", "-", "-", "-", "-"])
  const [turn, setTurn] = useState(true)
  const [available, setAvailable] = useState([1,2,3,4,5,6,7,8,9])
  

  const move = (turn, num) => {
    if(turn){
      setGameBoard[num] = "X"
      setAvailable[num] = null
    }
    else {
      
    }
  }
  

  return(
    <View style={styles.container}>
      <Button
        title="1"
        onPress={() => {
          move(true, 1)
        }}
      />
    </View>
  )
  Pressable
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: #ffffff,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
