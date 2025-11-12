import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { BarGraph } from '../../components/graph';
import { useEffect } from "react";

export default function chimppps() {
    const [cur, setCur] = useState(7);
    const [bval, setbval] = useState(1);
    const [d, setd] = useState([]); // position bounded on 1 > pos > 20
    let arr = new Array(20).fill(false);
    const [losses, setlosses] = useState(0);

    //sets d to be new arr with new random positioned buttons the increments current
    function newButtons() {
        setd(d => []);
        arr.fill(false);
        for (let i = 1; i <= cur; i++) {
            let obj = { key: i, value: i, pos: genPos() };
            setd(d => [...d, obj]);
        }
        //let temp = current++;
        //setCur(c => c + 1);
        
    }
    useEffect(()=> {
        newButtons();
    }, []);

    

    //generates unique number 1-20
    function genPos() {
        let pos = Math.floor(Math.random() * 20) + 1;
        if (arr[pos] == false) {
            arr[pos] = true;
            return pos;
        } else {
            genPos();
        }
    }

    const sigma = d.map((data) => (
        <View key={data.key} style={styles.gridItem}>
            <Pressable onPress={() => {
                if (bval === data.key) {
                    const newD = d.slice(1);
                    setd(newD);
                    setbval(b => b+1);


                    if (d.length == 0) {
                        //last button is pressed

                        newButtons();

                    }
                } else {
                    setlosses(losses => losses + 1) //way to increment

                    if (losses === 3) {
                        //lose state
                        setCur(1);
                        newButtons();
                        setlosses(0);
                    }
                }
            }}>
                <Text> {data.key} </Text>
            </Pressable>
        </View>

    ))

    return (
        <View>
            <View style={styles.button}>
                <Pressable onPress={() => {
                    setbval(b =>1);
                    console.log("before cur chng " +cur);
                    setCur(1);
                    console.log("after cur chng " + cur);
                    setlosses(0);
                    
                    setd(d => []);
                    
                    arr.fill(false);
                    for (let i = 1; i <= cur; i++) {
                        let obj = { key: i, value: i, pos: genPos() };
                        setd(d => [...d, obj]);
                    }
                    //let temp = current++;
                    console.log("pressed restart");
                }}>
                    <Text>Restart</Text>
                </Pressable>
            </View>
            <Text>losses: {losses} </Text>

            <View style={styles.container}>
                {sigma}
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around', // Distribute items evenly
        padding: 10,
    },
    gridItem: {
        width: '16%', // Approximately 5 items per row with spacing
        aspectRatio: 1, // Make items square
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 8,
    },
    button: {
        width: '20%',
        aspectRatio: 1,

    }
})