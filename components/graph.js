import { Svg, Line, Rect } from "react-native-svg";


export default function BarGraph({}){
    return <Svg width={70} height={100}>
        <Line x1={1} y1={100} x2={1} y2={0} strokeWidth={2} stroke={'black'} />
        <Rect x={10} y={20} width={10} height={2} fill={"red"}/>
        <Rect x={20} y={20} width={10} height={2} fill={"red"}/>
        <Rect x={30} y={20} width={10} height={2} fill={"red"}/>
        <Rect x={40} y={20} width={10} height={10} fill={"red"}/>
        <Rect x={50} y={20} width={10} height={2} fill={"red"}/>
        <Rect x={60} y={20} width={10} height={2} fill={"red"}/>
        <Line x1={1} y1={0} x2={70} y2={0} strokeWidth={2} stroke={'black'} />
    </Svg>
}