import { StyleSheet, Text, View, Pressable, Image, } from 'react-native';
import { useState } from 'react'; 

export default function TicTacToe() {
  const [gameBoard, setGameBoard] = useState(["-", "-", "-", "-", "-", "-", "-", "-", "-"]);
  const [claimed, setClaimed] = useState([false, false, false, false, false, false, false, false, false]);
  
  const move = (x) => {
    gameBoard[x] = "X"
    claimed[x] = true
  }
  

  return(
    <View style = {styles.container}>
      <View style={{ ...styles.press, marginRight: 285, marginBottom: 285}}> {/*1*/}
        {claimed[0] ? (
          <Image 
            source={require('../assets/X.png')} 
            style={{width: 100, height: 100}} 
          />
        )
        : (
          <Pressable onPress={
            () => move(0)
          }/>
        )}
      </View>
      <View style={{ ...styles.press, marginBottom: 285}}> {/*2*/}
        <Pressable onPress={move}/>
      </View>
      <View style={{ ...styles.press, marginBottom: 285, marginLeft: 285}}> {/*3*/}
        <Pressable onPress={move}/>
      </View>
      <View style={{ ...styles.press, marginRight: 285}}> {/*4*/}
        <Pressable onPress={move}/>
      </View>
      <View style={{ ...styles.press}}> {/*5*/}
        <Pressable onPress={move}/>
      </View>
      <View style={{ ...styles.press, marginLeft: 285}}> {/*6*/}
        <Pressable onPress={move}/>
      </View>
      <View style={{ ...styles.press, marginTop: 285, marginRight: 285}}> {/*7*/}
        <Pressable onPress={move}/>
      </View>
      <View style={{ ...styles.press, marginTop: 285}}> {/*8*/}
        <Pressable onPress={move}/>
      </View>
      <View style={{ ...styles.press, marginTop: 285, marginLeft: 285}}> {/*9*/}
        <Pressable onPress={move}/>
      </View>
      <Image 
        source={require('../assets/grid.png')} 
        style={styles.image} 
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
  press: {
    backgroundColor: "red",
    width: 100,
    height: 100,
    position: 'absolute'
  }
});
