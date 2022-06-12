import React from "react";
import { SafeAreaView, Button } from "react-native";

import { useAuth } from "../../contexts/AuthContext";
import PasscodeInput from "../../components/PasscodeInput";


export default function SetPasscodePage(): JSX.Element {
  const { signUp } = useAuth();
  const [passcode, setPasscode] = React.useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PasscodeInput onChangeText={setPasscode} value={passcode} />
      <Button title="Sign Up" onPress={(): Promise<void> => signUp(passcode)} />
    </SafeAreaView>
  );
}