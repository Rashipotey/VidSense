import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, VideoCard } from "../../components";

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

const Search = () => {
  const { query } = useLocalSearchParams<{ query: string }>();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

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
            <Text style={styles.headerText}>Search Results</Text>
            <Text style={styles.queryText}>{query}</Text>
            <View style={styles.searchContainer}>
              <SearchInput initialQuery={query} refetch={refetch} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E", 
  },
  headerContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#B0B0B0", 
  },
  queryText: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  searchContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
});

export default Search;
