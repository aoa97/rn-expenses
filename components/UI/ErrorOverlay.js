import { Text, StyleSheet, View } from "react-native";

export default function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  }
});
