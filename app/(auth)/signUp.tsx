import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, StyleSheet } from "react-native";
import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.innerContainer, { minHeight: Dimensions.get("window").height - 100 }]}>
          <Image source={images.logo} resizeMode="contain" style={styles.logo} />

          <Text style={styles.title}>Create an Account</Text>

          <FormField
            title="Username"
            value={form.username}
            placeholder="Enter your username"
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton title="Sign Up" handlePress={submit} isLoading={isSubmitting} />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <Link href="/signIn" style={styles.signupLink}>
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  logo: {
    width: 115,
    height: 34,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 20,
    textAlign: "center",
  },
  inputSpacing: {
    marginTop: 14,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
  signupText: {
    fontSize: 16,
    color: "#a1a1a1",
  },
  signupLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff9900",
    marginLeft: 6,
  },
});

export default SignUp;
