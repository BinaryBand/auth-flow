import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./contexts/AuthContext";

import SplashScreen from "./pages/SplashScreen";
import SetPasscodePage from "./pages/passcode/SetPage";
import ConfirmPasscodePage from "./pages/passcode/ConfirmPage";
import HomePage from "./pages/HomePage";


const { Navigator, Screen } = createNativeStackNavigator();

export default function App(): JSX.Element {
  const { isLoading, userToken, isSignedIn } = useAuth();

  return (
    <Navigator>
      {isLoading
        ? <Screen name="Splash Screen" component={SplashScreen} />
        : (userToken 
          ? (isSignedIn
            ? <Screen name="Home" component={HomePage} />
            : <Screen name="Confirm Passcode" component={ConfirmPasscodePage} />
          )
          : <Screen name="Set Passcode" component={SetPasscodePage} />
      )}
    </Navigator>
  );
}