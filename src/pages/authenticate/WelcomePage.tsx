import React from "react";
import { SafeAreaView, Text, Button } from "react-native";


export default function WelcomePage({ navigation }: any): JSX.Element {
  const { navigate } = navigation;

  return (
    <SafeAreaView>
      <Text>Welcome</Text>
      <Button title="Create Account" onPress={(): void => navigate("Sign Up")} />
      <Button title="Log In" onPress={(): void => navigate("Login")} />
    </SafeAreaView>
  );
}