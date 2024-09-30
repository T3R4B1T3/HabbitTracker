import { useState } from "react";
import { StyleSheet, View } from "react-native";
import InputData from "./Input";
import Button from "./ui/Button";

function AuthForm({ isLogin, onSubmit, dataIsWrong }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordDontMatch,
  } = dataIsWrong;

  function updateInputHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }
  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirPassword,
    });
  }

  return (
    <View>
      <View>
        <InputData
          label="Email Adress"
          placeholder="Enter email"
          onChangeValue={updateInputHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}></InputData>
        <InputData
          label="Password"
          placeholder="Enter password"
          onChangeValue={updateInputHandler.bind(this, "password")}
          value={enteredPassword}
          secure
          isInvalid={passwordIsInvalid}></InputData>
        {!isLogin && (
          <InputData
            label="Confirm Password"
            placeholder="Confirm Password"
            onChangeValue={updateInputHandler.bind(this, "confirmPassword")}
            value={enteredConfirPassword}
            secure
            isInvalid={passwordDontMatch}></InputData>
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log in" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
