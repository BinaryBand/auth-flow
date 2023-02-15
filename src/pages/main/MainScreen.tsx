import React from "react";
import { SafeAreaView, Text, Button } from "react-native";

import { useAuth } from "../../contexts/AuthContext";


export default function MainScreen(): JSX.Element {
  const { signOut } = useAuth();

  return (
    <SafeAreaView>
      <Text>Main Screen</Text>
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  )
}