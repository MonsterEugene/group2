import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import {BarGraph} from '../../components/graph';

const [current, setCurrent] = useState(2);
const [sig, setsig] = useState(0);
const [d, setd ] = useState([{key:1, value: 1, pos: 1}]); // position bounded on 1 > pos > 20
let arr = new Array(20).fill(false);

function newButtons(){
    d.setd([]);
    for (let i =1; i <= current; i++){
        let obj = {key: i, value: i, pos: genPos() };
        d.setd([...d, obj] )
    }
    setCurrent(...current++);
}
function genPos(){
    let pos = Math.floor(Math.random() * 20) + 1;
    if (arr[pos]==false ){
        arr[pos] = true;
        return pos;
    }else{
        genPos();
    }
}


export default function chimppps() {
    
    
   
    const sigma = d.map((data) => (
        <View key={data.key}>
            <Pressable>

            </Pressable>
        </View>

    ))

    return (
        <View>
            {sigma}
        </View>
    )
}