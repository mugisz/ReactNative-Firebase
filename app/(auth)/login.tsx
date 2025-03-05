import { AuthFooter, AuthForm, AuthHeader } from "@/components";
import { firebaseAuth } from "@/service/firebase";
import { IFormData } from "@/type/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";

export default function AuthScreen() {
  const auth = firebaseAuth;
  const [formData, setFormData] = useState<IFormData>({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("Login successful");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Login Failed",
        error?.toString() || "Check your credentials and try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Registration Failed",
        error?.toString() || "Try different credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: formData.email,
      password: null,
      confirmPassword: null,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6 py-12">
          <AuthHeader isLogin={isLogin} />

          <AuthForm
            formData={formData}
            setFormData={setFormData}
            isLogin={isLogin}
            loading={loading}
            onSubmit={isLogin ? handleSignIn : handleSignUp}
          />

          <AuthFooter isLogin={isLogin} onToggleMode={toggleAuthMode} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
