import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";

interface Creator {
  username: string;
  avatar: string;
}

interface Post {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator;
}

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts = [] } = useAppwrite(() => getUserPosts(user?.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/signIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }: { item: Post }) => (
          <VideoCard 
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
            </TouchableOpacity>

            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user?.avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.username}>{user?.username || "Unknown User"}</Text>

            <View style={styles.infoBoxContainer}>
            <InfoBox
              title={posts.length.toString()}
              subtitle="Posts"
              titleStyles={styles.titleStyles}
              containerStyles={styles.containerStyles} 
            />

            <InfoBox
              title="1.2K"
              subtitle="Followers"
              titleStyles={styles.titleStyles}
            />

            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  logoutButton: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  logoutIcon: {
    width: 28,
    height: 28,
    tintColor: "#FF4D4D", 
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#FFD700", 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  infoBoxContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleStyles: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", 
  },
  containerStyles: {
    marginRight: 40,
  },
  
});

export default Profile;
