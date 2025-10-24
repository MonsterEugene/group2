//import Svg, { Circle, Rect } from 'react-native-svg';
import { Link } from 'expo-router';
import { getPathFromState } from 'expo-router/build/fork/getPathFromState';
//import { FlashList } from '@shopify/flash-list';
import React, { useRef, useState } from 'react';
// import useThemedTextStyle from '@site/src/hooks/useThemedTextStyle';
import { Button, TextInput, Pressable, StyleSheet, Text, View, SafeAreaView, DevSettings } from 'react-native';

//import Animated, {
 // useAnimatedStyle,
  //useSharedValue,
//} from 'react-native-reanimated';
let winArray = [0,0,0,0,0,0,0];
function singleGuessArr(word, guess, guessArr, count){  	
	if(count > 6) return -1;
  //basic Wordle function to work around. 
    	for(let i = 0; i < 5; i++){
		if(word.includes(guess[i])){
			if(word.includes(guess[i],i)){
				guessArr[i] = 1;
			}else{ 
				guessArr[i] = 2; 	
			}
		}else{
			guessArr[i] = 0; 
		}
    }
	count++; 
	return guessArr; 
}

const Guess = props =>{
	let guess = props.guess;
	let word = props.word; 
	let count = 0; 
	let guessArr = [0,0,0,0,0];
	guessArr = singleGuessArr(word, guess, guessArr, count);
	console.log("hello"); 
	if(count<0){
		winArray[6]++; 
	}else{
		winArray[count-1]++; 
	}
	
	}




const displayGuess = props =>{
	let colors = ["","","","",""]; 
	for (let i = 0; i < 5; i++){
		if(props.arr[i] == 1) colors[i] = "green";
		else if(props.arr[i] == 0)colors[i] = "red"; 
		else if(props.arr[i] == 2)colors[i] = "yellow";  
		
	}
	return (
		<View> 
	 <div> 
		<Rect x = "100" y = {100} width = "50" height = "50" stroke = "green" strokeWidth="2" fill = {colors[0]}/>
		<Rect x = "160" y = {100} width = "50" height = "50" stroke = "green" strokeWidth="2" fill = {colors[1]}/>
		<Rect x = "220" y = {100} width = "50" height = "50" stroke = "green" strokeWidth="2" fill = {colors[2]}/>
		<Rect x = "280" y = {100} width = "50" height = "50" stroke = "green" strokeWidth="2" fill = {colors[3]}/>
		<Rect x = "340" y = {100} width = "50" height = "50" stroke = "green" strokeWidth="2" fill = {colors[4]}/>
		
	 </div>
	 </View> 
	); 

}
 





export default function App() {
	const [g, setGuess] = useState('');
    return(
		<View>
			<TextInput onChangeText = {setGuess}>Guess here</TextInput>
			
			<Button	title = "Guess" onPress = {() => <Guess guess = {g} word = "ghost"> </Guess>}> </Button>

        </View>
    );
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


