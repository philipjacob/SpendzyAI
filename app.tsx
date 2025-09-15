import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import LoginScreen from './app/login';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const prepare = async () => {
        await SplashScreen.preventAutoHideAsync();
        timer = setTimeout(async () => {
          await SplashScreen.hideAsync();
          setIsReady(true);
        }, 1000); // 3 seconds delay
    };

    prepare();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!isReady) {
    // Don't render app UI until splash is hidden
    return null;
  }else{
    alert("Welcome to the App!");
    return (<LoginScreen />);
  }
}