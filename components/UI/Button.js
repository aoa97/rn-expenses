import { StyleSheet, Text, View, Pressable } from "react-native";

import { GlobalStyles } from "../../constants/styles";

export default function Button({ children, style, mode, ...props }) {
  return (
    <View
      style={[styles.container, mode === "flat" && styles.flatContainer, style]}
    >
      <Pressable style={({ pressed }) => pressed && styles.pressed} {...props}>
        <View style={styles.innerContainer}>
          <Text style={[styles.text, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: GlobalStyles.box.radius / 2,
    overflow: "hidden",
  },
  innerContainer: {
    padding: 8,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  flatContainer: {
    backgroundColor: "transparent",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: GlobalStyles.colors.primary400,
  },
});
