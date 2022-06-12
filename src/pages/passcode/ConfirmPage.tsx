import React from "react";
import { SafeAreaView, Text, Button, Alert } from "react-native";

import { useAuth } from "../../contexts/AuthContext";
import PasscodeInput from "../../components/PasscodeInput";


export default function ConfirmPasscodePage(): JSX.Element {
  const { signIn, signOut } = useAuth();
  const [state, setState] = React.useState({ passcode: "", disabled: true });

  const updatePasscode = (passcode: string): void => {
    const disabled: boolean = passcode.length !== 6;
    setState({ passcode, disabled });
  };

  const signInWrapper = async (): Promise<void> => {
    updatePasscode("asd");

    // if (!(await signIn(state.passcode))) {
    //   // Alert.alert("Wrong Passcode");
    //   updatePasscode("");
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{state.passcode}</Text>
      <PasscodeInput onChangeText={updatePasscode} value={state.passcode} />
      <Button disabled={state.disabled} title="Sign In" onPress={signInWrapper} />
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  );
}