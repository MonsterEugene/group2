import { Svg, Line, Rect, Circle } from "react-native-svg";
import { FlatList } from "react-native";
import { View } from "react-native";

export default function BarGraph({ size, d }) {
    let rig = d.length - 1;
    let sig = size / d.length - 1;

    const sigma= d.map((data) => (
          <Rect
            key={data.key} // The key is crucial for performance
            
            
            x={data.key+2+sig*data.key}
            y={size} 
            height={-data.amo*size/10} 
            width={sig}
            fill={"red"}
            

          />
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
        <Line x1={0} y1={size} x2={0} y2={0} strokeWidth={2} stroke={'black'} />

        {sigma}

        <Line x1={0} y1={size} x2={size} y2={size} strokeWidth={2} stroke={'black'} />
    </Svg></View>
}