import { StyleSheet, Text, View, TextInput } from "react-native";

import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, textInputConfig, invalid, style }) {
  const inputStyles = [styles.input];

  if (textInputConfig.multiLine) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={[inputStyles]} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginBottom: 8,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    borderRadius: GlobalStyles.box.radius / 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
