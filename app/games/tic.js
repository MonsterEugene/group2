import { StyleSheet, Text, View, Pressable, Image, } from 'react-native';
import { useState } from 'react'; 

export default function TicTacToe() {
  const [gameBoard, setGameBoard] = useState(["-", "-", "-", "-", "-", "-", "-", "-", "-"]);
  const [claimed, setClaimed] = useState([false, false, false, false, false, false, false, false, false]);
  const winnah = false;

  const aiRng = () => {
    let newClaimed = [...claimed]
    let newGameBoard = [...gameBoard]
    let o = Math.random() * 9
    let claimed = newClaimed[o]
    while (claimed) {
      o = Math.random() * 9
      claimed = newClaimed[o]
    }
    return o
  }

  const move = (x) => {
    let newClaimed = [...claimed]
    let newGameBoard = [...gameBoard]
    newGameBoard[x] = "X"
    newClaimed[x] = true
    setClaimed(newClaimed)
    setGameBoard(newGameBoard)

    const o = aiRng()
    let aiClaimed = [...claimed]
    let aiGameBoard = [...gameBoard]
    aiGameBoard[o] = "O"
    aiClaimed[o] = true
    setClaimed(aiClaimed)
    setGameBoard(aiGameBoard)
  }
  
  const gameWin = () => {
    for(let i = "X"; true; i = "O"){
      if(gameBoard[0] == i && gameBoard[1] == i && gameBoard[2] == i){
        if(i == "X"){
          winnah = 1
          break
        }
        else{
          winnah = 2
          break
        }
      }
      else if(gameBoard[3] == i && gameBoard[4] == i && gameBoard[5] == i){
        if(i == "X"){
          winnah = 1
          break
        }
        else{
          winnah = 2
          break
        }
      }
      else if(gameBoard[6] == i && gameBoard[7] == i && gameBoard[8] == i){
        if(i == "X"){
          winnah = 1
          break
        }
        else{
          winnah = 2
          break
        }
      }
      else if(gameBoard[0] == i && gameBoard[3] == i && gameBoard[6] == i){
        if(i == "X"){
          winnah = 1
          break
        }
        else{
          winnah = 2
          break
        }
      }
      else if(gameBoard[1] == i && gameBoard[4] == i && gameBoard[7] == i){
        if(i == "X"){
          winnah = 1
          break
        }
        else{
          winnah = 2
          break
        }
      }
      else if(gameBoard[2] == i && gameBoard[5] == i && gameBoard[8] == i){
        if(i == "X"){
          winnah = 1
          break
        }
        else{
          winnah = 2
          break
        }
      }
      else if(gameBoard[0] == i && gameBoard[4] == i && gameBoard[8] == i){
        if(i == "X"){
          winnah = 1
          break
        }
        else{
          winnah = 2
          break
        }
      }
      else if(gameBoard[2] == i && gameBoard[4] == i && gameBoard[6] == i){
        if(i == "X"){
          winnah = 1
          break
        }
        else{
          winnah = 2
          break
        }
      }
    }
  }

  return(
    <View style = {styles.container}>
      if(winnah){
        <Text style={styles.win}>YOU WIN!</Text>
      }
      <Image 
        source={require('../../assets/grid.png')} 
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
            source={require('../../assets/X.png')} 
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
            source={require('../../assets/X.png')} 
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
            source={require('../../assets/X.png')} 
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
            source={require('../../assets/X.png')} 
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
            source={require('../../assets/X.png')} 
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
            source={require('../../assets/X.png')} 
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
            source={require('../../assets/X.png')} 
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
            source={require('../../assets/X.png')} 
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
            source={require('../../assets/X.png')} 
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
  },
  win: {
    height: 500,
    width: 100,
    position: 'absolute'
  }
});