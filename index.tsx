/**
 * @format
 */

import React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./src/App";

import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";


function Index(): JSX.Element {
  return (
    <NavigationContainer>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Index);
