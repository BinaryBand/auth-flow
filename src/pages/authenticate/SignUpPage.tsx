import React from "react";
import { SafeAreaView, TextInput, Button } from "react-native";

import { useAuth } from "../../contexts/AuthContext";


export default function SignUpPage(): JSX.Element {
  const { signUp, setLock } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signUpWrapper = async (): Promise<void> => {
    await signUp(username, password);
  };

  return (
    <SafeAreaView>
      <TextInput value={username} onChangeText={setUsername} placeholder="Username" />
      <TextInput secureTextEntry={true} value={password} onChangeText={setPassword} placeholder="Password" />
      <Button title="Sign Up" onPress={signUpWrapper} />
    </SafeAreaView>
  );
}