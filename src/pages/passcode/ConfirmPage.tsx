import React, { useEffect } from "react";
import { SafeAreaView, Text, Button, TextInput, Alert } from "react-native";

import { useAuth } from "../../contexts/AuthContext";
import PasscodeInput from "../../components/PasscodeInput";


export default function ConfirmPasscodePage(): JSX.Element {
  const { signIn, signOut } = useAuth();
  const [passcode, setPasscode] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  const updatePasscode = (passcode: string): void => {
    setPasscode(passcode);
    setDisabled(passcode.length !== 6);
  };

  const signInWrapper = async (): Promise<void> => {
    // if (!(await signIn(state.passcode))) {
    //   // Alert.alert("Wrong Passcode");
    //   updatePasscode("");
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{passcode}</Text>

      <PasscodeInput value={passcode} onChangeText={updatePasscode} />
      <Button title="Cancel" onPress={() => updatePasscode("")} />
      <Button disabled={disabled} title="Sign In" onPress={signInWrapper} />
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  );
}