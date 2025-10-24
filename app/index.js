import { Link } from 'expo-router'; 
import { StyleSheet, Text, View } from 'react-native';


export default function App(){
    return(
        <View> 
    <Text> hi </Text>
    <Link href = "games/wordle"> wordle </Link>
    </View>
);
} 
