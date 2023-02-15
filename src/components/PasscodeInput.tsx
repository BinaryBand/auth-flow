import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";


type KeyInputContainerProps = {
  onPress?: () => void;
  children?: React.ReactNode;
};

class KeyInputContainer extends React.Component<KeyInputContainerProps> {
  private onPress?: () => void;
  private children?: React.ReactNode;

  constructor(props: KeyInputContainerProps) {
    super(props);

    this.onPress = props.onPress;
    this.children = props.children;
  }

  public render(): JSX.Element {
    return (
      <TouchableOpacity style={passcodeStyle.keyParent} onPress={this.onPress}>
        {this.children}
      </TouchableOpacity>
    );
  }
}

type KeyInputProps = {
  onPress?: (value?: string) => void;
  value?: string;
};

type KeyInputState = {
  value: string;
};

class KeyInput extends React.Component<KeyInputProps> {
  private onPress?: (value?: string) => void;
  public state: KeyInputState;

  constructor(props: KeyInputProps) {
    super(props);

    this.update = this.update.bind(this);
    this.onPress = props.onPress;
    this.state = {
      value: props.value || ""
    };
  }

  private update(): void {
    if (this.onPress) {
      this.onPress(this.state.value);
    }
  }

  public render(): JSX.Element {
    return (
      <KeyInputContainer onPress={this.update}>
        <Text style={passcodeStyle.keyContent}>{this.state.value}</Text>
      </KeyInputContainer>
    );
  }
}

type PasscodeProps = {
  onChangeText?: (value: string) => void;
  length?: number;
  value?: string;
};

type PasscodeState = {
  value: string;
};

export default class PasscodeInput extends React.Component<PasscodeProps> {
  private onChangeText?: (value: string) => void;
  private length: number;
  public state: PasscodeState;

  constructor(props: PasscodeProps) {
    super(props);

    this.addDigit = this.addDigit.bind(this);
    this.removeDigit = this.removeDigit.bind(this);
    this.onChangeText = props.onChangeText;

    this.length = props.length || 6;

    this.state = {
      value: props.value || ""
    };
  }

  public componentDidUpdate(): void {
    if (this.props.value?.length !== this.state.value.length) {
      this.setState({ value: this.props.value });
    }
  }

  private update(value: string): void {
    this.setState({ value });

    if (this.onChangeText) {
      this.onChangeText(value);
    }
  }

  private addDigit(digit?: string): void {
    const value: string = (this.state.value + digit).slice(0, this.length);
    this.update(value);
  }

  private removeDigit(): void {
    if (0 < this.length) {
      const value: string = this.state.value.slice(0, -1);
      this.update(value);
    }
  }

  public render(): JSX.Element {
    return (
      <>
        <Text style={{ textAlign: "center" }}>{this.state.value}</Text>

        <View style={passcodeStyle.row}>
          <KeyInput onPress={this.addDigit} value="1" />
          <KeyInput onPress={this.addDigit} value="2" />
          <KeyInput onPress={this.addDigit} value="3" />
        </View>

        <View style={passcodeStyle.row}>
          <KeyInput onPress={this.addDigit} value="4" />
          <KeyInput onPress={this.addDigit} value="5" />
          <KeyInput onPress={this.addDigit} value="6" />
        </View>

        <View style={passcodeStyle.row}>
          <KeyInput onPress={this.addDigit} value="7" />
          <KeyInput onPress={this.addDigit} value="8" />
          <KeyInput onPress={this.addDigit} value="9" />
        </View>

        <View style={passcodeStyle.row}>
          <KeyInputContainer>
            <Icon name="md-sync-circle" color="#ccc" size={25} />
          </KeyInputContainer>

          <KeyInput onPress={this.addDigit} value="0" />

          <KeyInputContainer onPress={this.removeDigit}>
            <Icon name="backspace" color="#ccc" size={25} />
          </KeyInputContainer>
        </View>
      </>
    );
  }
}

const passcodeStyle = StyleSheet.create({
  row: {
    flexDirection: "row",     // Align content side-by-side
    justifyContent: "center", // Push content to the center
  },

  keyParent: {
    // Theme
    backgroundColor: "white",

    // Shadow
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,

    // Dimensions
    width: 65,
    height: 65,
    borderRadius: 65,

    // Child position
    justifyContent: "center", // Centered horizontally
    alignItems: "center",     // Centered vertically
  },

  keyContent: {
    // Font
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
  }
});