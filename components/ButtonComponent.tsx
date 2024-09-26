import React from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface ButtonComponentProps {
  title: string;
  onPress: () => void;
  color: string;
  style?: ViewStyle;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  onPress,
  color = "blue",
  style,
}) => (
  <Pressable onPress={onPress} style={[styles.button, style]}>
    <Text style={{ color: "white", fontSize: 24 }}>{title}</Text>
  </Pressable>
);
const styles = StyleSheet.create({
  button: {
    margin: 0,
  },
});

export default ButtonComponent;
