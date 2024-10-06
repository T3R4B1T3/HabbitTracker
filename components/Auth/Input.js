import { StyleSheet, Text, TextInput, View } from "react-native";

function InputData({
  label,
  keyboardType,
  secure,
  onChangeValue,
  value,
  isInvalid,
  placeholder,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onChangeValue}
        value={value}></TextInput>
    </View>
  );
}
export default InputData;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "#eaeaea",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold"
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderRadius: 6,
    borderColor:"#4f6d7a",
    borderWidth: 1,
    fontSize: 14,
  },
});
