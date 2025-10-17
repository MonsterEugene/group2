import { Stack } from 'expo-router'

export default function RootLayout() {
    return (
        <Stack> 
            <Stack.Screen name="ticTacToe" options={{ title: "TicTacToe"}}/>
            <Stack.Screen name="wordle" options={{ title: "Wordle"}}/>
            <Stack.Screen name="index" options={{ title: "Index page"}}/>
        </Stack>
    )
}