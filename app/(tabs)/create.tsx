import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {View,Text,Alert,Image,TouchableOpacity,ScrollView,StyleSheet} from "react-native";
import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

interface FormData {
  title: string;
  video: DocumentPicker.DocumentPickerAsset | null;
  thumbnail: DocumentPicker.DocumentPickerAsset | null;
  prompt: string;
}

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: "image" | "video") => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/png", "image/jpg", "image/jpeg"] : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      setForm((prevForm) => ({
        ...prevForm,
        [selectType === "image" ? "thumbnail" : "video"]: result.assets[0],
      }));
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      return Alert.alert("Please provide all fields");
    }
    setUploading(true);
    try {
      await createVideoPost({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({ title: "", video: null, thumbnail: null, prompt: "" });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={{ paddingBottom: 100 }}  
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
        />

        <View style={styles.uploadContainer}>
          <Text style={styles.label}>Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Image source={icons.upload} style={styles.uploadIcon} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.label}>Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image source={{ uri: form.thumbnail.uri }} style={styles.thumbnail} />
            ) : (
              <View style={styles.uploadBox}>
                <Image source={icons.upload} style={styles.uploadIcon} />
                <Text style={styles.uploadText}>Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles={{ marginTop: 28 }} 
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
  uploadContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 8,
  },
  video: {
    width: "100%",
    height: 250,
    borderRadius: 12,
  },
  uploadPlaceholder: {
    width: "100%",
    height: 160,
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  uploadBox: {
    width: "100%",
    height: 50,
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  uploadIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  uploadText: {
    fontSize: 14,
    color: "#ccc",
    marginLeft: 8,
  },
  thumbnail: {
    width: "100%",
    height: 250,
    borderRadius: 12,
  },
});

export default Create;
