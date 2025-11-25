import { StyleSheet, Text, View, Pressable, Image, } from 'react-native';
import { useState } from 'react'; 

export default function TicTacToe() {
  const [gameBoard, setGameBoard] = useState(["-", "-", "-", "-", "-", "-", "-", "-", "-"]);
  const [claimed, setClaimed] = useState([false, false, false, false, false, false, false, false, false]);
  const winnah = false;

  const move = (x) => {
    let newClaimed = [...claimed]
    let newGameBoard = [...gameBoard]
    newGameBoard[x] = "X"
    newClaimed[x] = true
    setClaimed(newClaimed)
    setGameBoard(newGameBoard)
    
    while (true) {
      const o = Math.random() * 9
      if(!claimed[o]){
        let newClaimed = [...claimed]
        let newGameBoard = [...gameBoard]
        newGameBoard[o] = "O"
        newClaimed[o] = true
        setClaimed(newClaimed)
        setGameBoard(newGameBoard)
        break
      }
    }
  }
  
  const gameWin = () => {
    for(let i = "X"; !winnah; i = "O"){
      if(gameBoard[0] == i && gameBoard[1] == i && gameBoard[2] == i){
        winnah = true
      }
      else if(gameBoard[3] == i && gameBoard[4] == i && gameBoard[5] == i){
        winnah = true
      }
      else if(gameBoard[6] == i && gameBoard[7] == i && gameBoard[8] == i){
        winnah = true
      }
      else if(gameBoard[0] == i && gameBoard[3] == i && gameBoard[6] == i){
        winnah = true
      }
      else if(gameBoard[1] == i && gameBoard[4] == i && gameBoard[7] == i){
        winnah = true
      }
      else if(gameBoard[2] == i && gameBoard[5] == i && gameBoard[8] == i){
        winnah = true
      }
      else if(gameBoard[0] == i && gameBoard[4] == i && gameBoard[8] == i){
        winnah = true
      }
      else if(gameBoard[2] == i && gameBoard[4] == i && gameBoard[6] == i){
        winnah = true
      }
    }
  }

  return(
    <View style = {styles.container}>
      <Image 
        
        style={styles.image} 
      />
      <Pressable
        onPress={
          () => {move(0)}
        }
        style={{ ...styles.press, marginRight: 285, marginBottom: 285}}
      >
        {claimed[0] && (
          <Image 
            // source={require('../../assets/X.png')} 
            style={{width: 100, height: 100}} 
          />
        )
        } 
      </Pressable>
      <Pressable
        onPress={
          () => {move(1)}
        }
        style={{ ...styles.press, marginBottom: 285}}
      >
        {claimed[1] && (
          <Image 
            // source={require('../../assets/X.png')} 
            style={{width: 100, height: 100}} 
          />
        )
        } 
      </Pressable>
      <Pressable
        onPress={
          () => {move(2)}
        }
        style={{ ...styles.press, marginLeft: 285, marginBottom: 285}}
      >
        {claimed[2] && (
          <Image 
            // source={require('../../assets/X.png')} 
            style={{width: 100, height: 100}} 
          />
        )
        } 
      </Pressable>
      <Pressable
        onPress={
          () => {move(3)}
        }
        style={{ ...styles.press, marginRight: 285}}
      >
        {claimed[3] && (
          <Image 
            // source={require('../../assets/X.png')} 
            style={{width: 100, height: 100}} 
          />
        )
        } 
      </Pressable>
      <Pressable
        onPress={
          () => {move(4)}
        }
        style={{ ...styles.press}}
      >
        {claimed[4] && (
          <Image 
            // source={require('../../assets/X.png')} 
            style={{width: 100, height: 100}} 
          />
        )
        } 
      </Pressable>
      <Pressable
        onPress={
          () => {move(5)}
        }
        style={{ ...styles.press, marginLeft: 285}}
      >
        {claimed[5] && (
          <Image 
            // source={require('../../assets/X.png')} 
            style={{width: 100, height: 100}} 
          />
        )
        } 
      </Pressable>
      <Pressable
        onPress={
          () => {move(6)}
        }
        style={{ ...styles.press, marginRight: 285, marginTop: 285}}
      >
        {claimed[6] && (
          <Image 
            // source={require('../../assets/X.png')} 
            style={{width: 100, height: 100}} 
          />
        )
        } 
      </Pressable>
      <Pressable
        onPress={
          () => {move(7)}
        }
        style={{ ...styles.press, marginTop: 285}}
      >
        {claimed[7] && (
          <Image 
            // source={require('../../assets/X.png')} 
            style={{width: 100, height: 100}} 
          />
        )
        } 
      </Pressable>
      <Pressable
        onPress={
          () => {move(8)}
        }
        style={{ ...styles.press, marginLeft: 285, marginTop: 285}}
      >
        {claimed[8] && (
          <Image 
            // source={require('../../assets/X.png')} 
            style={{width: 100, height: 100}} 
          />
        )
        } 
      </Pressable>
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
  press: {
    width: 100,
    height: 100,
    position: 'absolute'
  }
});