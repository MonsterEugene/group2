import { Stack } from 'expo-router'

export default function RootLayout() {
    return (
        <Stack> 
            <Stack.Screen name="games/tic" options={{ title: "TicTacToe"}}/>
            <Stack.Screen name="games/wordle" options={{ title: "Wordle"}}/>
            <Stack.Screen name="index" options={{ title: "Home"}}/>
            
        </Stack>
    )
}