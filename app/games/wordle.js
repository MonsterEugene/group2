import Svg, { Circle, Rect } from 'react-native-svg';
let count = 0; 
let arr = [0,0,0,0,0]; 
function guess ({word, guess}) {  
	if(count > 6) return -1; 
  //basic Wordle function to work around. 
    	let guess = props.guess; 
    	for(let i = 0; i < word.length; i++){
		if(word.includes(guess[i])){
			if(world.includes(guess[i],i)){
				arr[i] = 1;
			}else{
				arr[i] = 2; 	
			}
		}else{
			arr[i] = 0; 
		}
    }
	return count++; 
}
function displayGuess({arr}){
	let colors = ["","","","",""]; 
	for (let i = 0; i < arr.length; i++){
		if(arr[i] == 1) colors[i] = "green";
		else if(arr[i] == 0)colors[i] = "red"; 
		else if(arr[i] == 2)colors[i] = "yellow";  
		
	}
	displayGuess(); 
	return (
		<View> 
	 <div> 
		<Rect x = "100" y = "100" width = "50" height = "50" stroke = "green" strokeWidth="2" fill = {colors[0]}/>
		<Rect x = "160" y = "100" width = "50" height = "50" stroke = "green" strokeWidth="2" fill = {colors[1]}/>
		<Rect x = "220" y = "100" width = "50" height = "50" stroke = "green" strokeWidth="2" fill = {colors[2]}/>
		<Rect x = "280" y = "100" width = "50" height = "50" stroke = "green" strokeWidth="2" fill = {colors[3]}/>
		<Rect x = "340" y = "100" width = "50" height = "50" stroke = "green" strokeWidth="2" fill = {colors[4]}/>
		
	 </div>
	 </View> 
	); 

}
 


export default function App(){
	return(
		<input type="text" name="userInput" onChangeText = {guess(word,document.getElementById("userInput"))} placeholder="Guess here! (5 letters)"/>

	);


}




