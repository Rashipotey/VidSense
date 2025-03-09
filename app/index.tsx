import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  Redirect, router } from 'expo-router';
import { images } from '../constants';
import { CustomButton } from '../components';
import GlobalProvider, { useGlobalContext } from '@/context/GlobalProvider';

export default function HomeScreen() {
  const { loading: isLoading, isLogged: isLoggedIn } = useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href="/home"/>
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 }}>
        <Image source={images.logo} style={{ width: 130, height: 84 }} resizeMode="contain" />
        <Image source={images.cards} style={{ width: "100%", maxWidth: 380, height: 300 }} resizeMode="contain" />
        <View style={{ marginTop: 20, alignItems: "center", position: "relative" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#FFFFFF", textAlign: "center" }}>
            Discover Endless Possibilities with{" "}
            <Text style={{ color: "#FFD700" }}>Aura</Text>
          </Text>
          <Image source={images.path} style={{ width: 136, height: 15, position: "absolute", bottom: -8, left: 120}} resizeMode="contain" />
        </View>
        <Text style={{ fontSize: 14, color: "#CCCCCC", marginTop: 15, textAlign: "center", paddingHorizontal: 20 }}>
          Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
        </Text>
        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/signIn")}
        />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
