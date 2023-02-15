import React from "react";

import { useAuth } from "./contexts/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./pages/SplashScreen";
import MainScreen from "./pages/main/MainScreen";

import WelcomePage from "./pages/authenticate/WelcomePage";
import SignUpPage from "./pages/authenticate/SignUpPage";
import LoginPage from "./pages/authenticate/LoginPage";


const { Navigator, Screen } = createNativeStackNavigator();

export default function App(): JSX.Element {
  const { userToken } = useAuth();

  return (
    <Navigator>
      {
        userToken ? (
          <>
            <Screen name="Main" component={MainScreen} />
          </>
        ) : (
          <>
            <Screen name="Welcome" component={WelcomePage} />
            <Screen name="Sign Up" component={SignUpPage} />
            <Screen name="Login" component={LoginPage} />
          </>
        )
      }
    </Navigator>
  );
}