import { Svg, Line, Rect, Circle, Text } from "react-native-svg";
import { FlatList, Pressable } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function BarGraph({ size, d }) {
    const [isHovered, setIsHovered] = useState(false);

    let sig = size / d.length - 1;
    let maxAmo = 1;
    for (let i = 0; i < d.length; i++) {

        if (maxAmo < d[i].amo) {
            maxAmo = d[i].amo;
        }
    }
    const sigma = d.map((data) => (
        <View key={data.key}>
            
            <Rect
                //key={data.key} // The key is crucial for performance


                x={data.key + size / 50 + sig * data.key- size/125}
                y={size}
                height={-data.amo * size / maxAmo}
                width={sig}
                fill={"red"}
            >
                {/*<Pressable key={data.key}
                onPress={() => setIsHovered(true)}
                onHoverOut={() => setIsHovered(false)}

            style={({ pressed }) => [
                styles.button,
                isHovered && styles.buttonHovered,
                pressed && styles.buttonPressed,
            ]} ></Pressable>*/}
            </Rect>
            <Text
                x={data.key + size / 50 + sig * data.key}
                y={size-size/75} fill={"black"}  fontSize={'10'}>
                {data.key}
            </Text>
            <Text
                x={data.key + size / 50 + sig * data.key }
                y={size -data.amo * size / maxAmo + size/50+1} fill={"black"}  fontSize={'10'}>
                {data.amo}
            </Text>
        </View>

    ))
    //let i =0;
    /*for (let i = 0; i < d.length; i++) {
        const svg = document.getElementById('mySvg');
        const spacing = 20;
        const radius=10;
        // Create a new circle element
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        // Set attributes for the circle
        circle.setAttribute('cx', (i * spacing) + radius + 10); // X position
        circle.setAttribute('cy', 100); // Y position
        circle.setAttribute('r', radius); // Radius
        circle.setAttribute('fill', `hsl(${i * 36}, 70%, 50%)`); // Dynamic fill color

        // Append the circle to the SVG
        svg.appendChild(circle);
    }*/

    /*<FlatList data={d}
    renderItem={(itemData)=>{
        return <Rect x={itemData.item.key+2+sig*itemData.item.key} y={size} width={sig} height={-itemData.item.amo*size/10} fill={"red"}/>
    }}/> */
    return <View><Svg width={size} height={size} id="mySvg">
        <Line x1={0} y1={size} x2={0} y2={0} strokeWidth={size / 50} stroke={'black'} />

        {sigma}

        <Line x1={0} y1={size} x2={size} y2={size} strokeWidth={size / 50} stroke={'black'} />
    </Svg></View>
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
    },
    buttonHovered: {
        backgroundColor: 'cornflowerblue',
    },
    buttonPressed: {
        backgroundColor: 'darkblue',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});