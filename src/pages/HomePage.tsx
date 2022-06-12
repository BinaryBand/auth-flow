import React from "react";
import { SafeAreaView, Text, Button } from "react-native";

import { useAuth } from "../contexts/AuthContext";


export default function HomePage(): JSX.Element {
  const { signOut, lockOut } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Home Page!</Text>
      <Button title="Sign Out" onPress={signOut} />
      <Button title="Lock Out" onPress={lockOut} />
    </SafeAreaView>
  );
}