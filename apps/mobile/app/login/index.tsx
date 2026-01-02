import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useForm } from "@tanstack/react-form";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { authClient, setToken } from "../../src/lib/auth";
import { useAuthState } from "../../src/store/authState";
import { Button } from "../../src/components";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthenticated } = useAuthState();

  const form = useForm({
    defaultValues: {
      email: "test@example.com",
      password: "password123",
    },
    onSubmit: async ({ value }) => {
      try {
        console.log("Login submitted:", value);
        const response = await authClient.signIn.email(value);
        await setToken(response.data?.token || "");
        await setAuthenticated(true);
        console.log("response: ", response);
        router.replace("/");
      } catch (error) {
        console.log("error: ", error);
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/icon.png")} style={styles.logo} />
      <Text style={styles.title}>Login</Text>

      <form.Field name="email">
        {(field) => (
          <>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {field.state.meta.errors.length > 0 && <Text style={styles.errorText}>{field.state.meta.errors[0]}</Text>}
          </>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
              <TextInput style={styles.input} placeholder="Password" value={field.state.value} onChangeText={field.handleChange} onBlur={field.handleBlur} secureTextEntry={!showPassword} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
              </TouchableOpacity>
            </View>
            {field.state.meta.errors.length > 0 && <Text style={styles.errorText}>{field.state.meta.errors[0]}</Text>}
          </>
        )}
      </form.Field>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button text="Login" onPress={() => form.handleSubmit()} />

      <Text style={styles.signUp}>
        Don't have an account?{" "}
        <Link href="/signup" asChild>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: "bold",
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#000",
  },
  signUp: {
    color: "#000",
  },
  signUpLink: {
    color: "#1E90FF",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
});
