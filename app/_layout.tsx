import "../global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import * as Clipboard from 'expo-clipboard'; // For Expo
import { SheetProvider } from 'react-native-actions-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font'

const queryClient = new QueryClient()

export default function RootLayout() {

  const onCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      return true;
    } catch {
      return false;
    }
  };

  const [fontsLoaded, error] = useFonts({
    'Poppins-ExtraLight': require('../assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins/Poppins-Thin.ttf'),
    'Poppins-light': require('../assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins/Poppins-Black.ttf'),
  })

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SheetProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="bookmarked"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="search"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="article"
                options={{ headerShown: false }}
              />
            </Stack>
          </SheetProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <DevToolsBubble onCopy={onCopy} queryClient={queryClient} />
    </QueryClientProvider>
  );
}
