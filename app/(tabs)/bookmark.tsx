import React from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";

const videos = [
  {
    id: "1",
    title: "The camera follows behind a white vehicle...",
    creator: "Johnson",
    avatar: "https://example.com/avatar1.png",
    thumbnail: "https://example.com/thumb1.jpg",
  },
  {
    id: "2",
    title: "Close up on cartoon character...",
    creator: "Christopher",
    avatar: "https://example.com/avatar2.png",
    thumbnail: "https://example.com/thumb2.jpg",
  },
];

const SavedVideos = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Saved Videos</Text>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search your saved videos" placeholderTextColor="#888" />
      </View>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.videoCard}>
            <View style={styles.videoHeader}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.creator}>{item.creator}</Text>
              </View>
              <TouchableOpacity style={styles.menuIcon}>
                <Image source={icons.menu} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          </View>
        )}
      />
      <View style={styles.navBar}>
        <TouchableOpacity><Image source={icons.home} style={styles.navIcon} /></TouchableOpacity>
        <TouchableOpacity><Image source={icons.profile} style={styles.navIcon} /></TouchableOpacity>
        <TouchableOpacity><Image source={icons.plus} style={styles.navIcon} /></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E1E", paddingHorizontal: 16 },
  header: { fontSize: 22, color: "#FFFFFF", fontWeight: "600", marginVertical: 10 },
  searchContainer: { backgroundColor: "#333", padding: 10, borderRadius: 10 },
  searchInput: { color: "#FFF", fontSize: 16 },
  videoCard: { marginVertical: 10 },
  videoHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  title: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  creator: { fontSize: 14, color: "#AAAAAA" },
  menuIcon: { marginLeft: "auto" },
  icon: { width: 20, height: 20 },
  thumbnail: { width: "100%", height: 200, borderRadius: 12 },
  navBar: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10, backgroundColor: "#111" },
  navIcon: { width: 28, height: 28, tintColor: "#888" },
  activeTab: { tintColor: "#FFD700" },
});

export default SavedVideos;
