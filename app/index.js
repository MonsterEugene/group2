import { Link } from 'expo-router'; 
import { StyleSheet, Text, View } from 'react-native';
import BarGraph from '../components/graph';


export default function App(){
    return <View>
        <Text>hello</Text>
        <BarGraph size={500} d={[{key:0, amo: 1}, {key:1, amo:3}, {key:2, amo:5}, {key:3, amo:10}, {key:4, amo:3}, {key:5, amo:1},{key:6, amo:4 }]}/>
    </View>
} 
