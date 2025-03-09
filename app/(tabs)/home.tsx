import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet, Dimensions } from "react-native";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

interface Post {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
}

const Home = () => {
  const { data: posts = [], refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts = [] } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.welcomeText}>Welcome Back</Text>
              </View>

              <View style={styles.logoContainer}>
                <Image
                  source={images.logoSmall}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput initialQuery={""} refetch={function (): Promise<void> {
              throw new Error("Function not implemented.");
            } } />

            <View style={styles.latestVideosContainer}>
              <Text style={styles.latestVideosText}>Latest Videos</Text>

              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 14,
    color: "#a1a1a1",
  },
  usernameText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
  },
  logoContainer: {
    marginTop: 4,
  },
  logo: {
    width: 36,
    height: 40,
  },
  latestVideosContainer: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  latestVideosText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 12,
  },
});

export default Home;