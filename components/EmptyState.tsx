import { router } from "expo-router";
import { View, Text, Image, ImageSourcePropType, StyleSheet } from "react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Image source={images.empty as ImageSourcePropType} resizeMode="contain" style={styles.image} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: 270,
    height: 216,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#A1A1A1",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginTop: 8,
  },
  button: {
    width: "100%",
    marginVertical: 20,
  },
});

export default EmptyState;
