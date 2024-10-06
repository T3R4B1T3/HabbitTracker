import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import AuthForm from "./AuthFrom";
import FlatButton from "./ui/flatButton";
import { useNavigation } from "@react-navigation/native";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const [dataIsWrong, setDataIsWrong] = useState({
    email: false,
    password: false,
    confirmpassword: false,
  });
  function switchAuthHandler() {
    if (isLogin) {
      navigation.navigate("Register");
    } else {
      navigation.navigate("Login");
    }
  }

  function submitHandler(data) {
    let { email, password, confirmPassword } = data;
    email = email.trim();
    password = password.trim();

    const emailIsOk = email.includes("@");
    const passwordIsOk = password.length > 6;
    const passwordAreOk = password === confirmPassword;

    if (!emailIsOk || !passwordIsOk || (!isLogin && !passwordAreOk)) {
      Alert.alert("Invalid input", "Please check your entered values");
      setDataIsWrong({
        email: !emailIsOk,
        password: !passwordIsOk,
        confirmpassword: !passwordIsOk || !passwordAreOk,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.container}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        dataIsWrong={dataIsWrong}></AuthForm>
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthHandler}>
          {isLogin ? "Create a new user" : "Log in insted"}
        </FlatButton>
      </View>
    </View>
  );
}
export default AuthContent;

const styles = StyleSheet.create({
  container: {
    marginTop: 124,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#4f6d7a",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowColor: "black",
    shadowRadius: 6,
    
  },
  buttons: {
    marginTop: 2,
  },
});
