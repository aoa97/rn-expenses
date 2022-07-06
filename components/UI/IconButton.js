import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ icon, size, color, ...otherProps }) {
  return (
    <Pressable
      {...otherProps}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={icon} size={size ? size : 24} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
});
