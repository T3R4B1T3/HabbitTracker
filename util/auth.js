import axios from "axios";

const API_KEY = "AIzaSyCNJTQnMe1oIcK4IsBdBVlZ3kAG7y7tglI";
export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  console.log(response.data);

  const token = response.data.idToken;
  const userEmail = response.data.email;
  return { token, userEmail };
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}
export function loginUser(email, password) {
  return authenticate("signInWithPassword", email, password);
}
