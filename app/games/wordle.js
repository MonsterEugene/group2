


export default function Wordle ({word, guess}) {  
  //basic Wordle function to work around. 
	let arr = [0,0,0,0,0]; 		
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
	return arr;            	
}
 




