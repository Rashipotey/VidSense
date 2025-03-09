import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, GestureResponderEvent, StyleSheet } from "react-native";

type CustomButtonProps = {
  title: string;
  handlePress?: (event: GestureResponderEvent) => void;
  containerStyles?: object;
  textStyles?: object;
  isLoading?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles = {},
  textStyles = {},
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.button, containerStyles, isLoading && styles.disabled]}
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>
      {isLoading && <ActivityIndicator animating={true} color="#fff" size="small" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFD700", 
    borderRadius: 10,
    minHeight: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "#FFFFFF", 
    fontWeight: "600",
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButton;
