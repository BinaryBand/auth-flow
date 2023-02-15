import React from "react";
import { SafeAreaView, Text, Button } from "react-native";


export default function LoginPage({ navigation }: any): JSX.Element {
  return (
    <SafeAreaView>
      <Text>Oops: Nothing To See Here</Text>
      <Button title="Go Back" onPress={navigation.goBack} />
    </SafeAreaView>
  );
}