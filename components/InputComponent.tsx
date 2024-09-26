import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
interface InputComponentProps extends TextInputProps {
  style?: TextInputProps["style"];
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
}) => (
  <TextInput
    style={[styles.input, style]}
    onChangeText={onChangeText}
    placeholder={placeholder}
    value={value}
  />
);
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: "90%",
    margin: 0,
  },
});

export default InputComponent;
