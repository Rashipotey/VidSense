import { useState } from "react";
import { ResizeMode, Video, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ViewStyle,
  View,
  StyleSheet,
  TextStyle,
  ImageStyle,
} from "react-native";
import { icons } from "../constants";

const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: { transform: [{ scale: 0.9 }] },
  1: { transform: [{ scale: 1 }] },
};

const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  0: { transform: [{ scale: 1 }] },
  1: { transform: [{ scale: 0.9 }] },
};

interface Post {
  $id: string;
  video: string;
  thumbnail: string;
}

interface TrendingItemProps {
  activeItem: string;
  item: Post;
}

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <Animatable.View
      style={styles.container}
      animation={activeItem === item.$id ? (zoomIn as any) : (zoomOut as any)}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if ("didJustFinish" in status && (status as AVPlaybackStatusSuccess).didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity style={styles.touchable} activeOpacity={0.7} onPress={() => setPlay(true)}>
          <ImageBackground source={{ uri: item.thumbnail }} style={styles.thumbnail} imageStyle={styles.imageBorder}>
            <Image source={icons.play} style={styles.playIcon} resizeMode="contain" />
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: Post[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState<string>(posts[0]?.$id || "");

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: { key: string }[] }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
  video: {
    width: 200,
    height: 280,
    borderRadius: 33,
    marginTop: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  touchable: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: 200,
    height: 280,
    marginVertical: 20,
    borderRadius: 33,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // Android shadow
  },
  imageBorder: {
    borderRadius: 33,
  },
  playIcon: {
    width: 48,
    height: 48,
    position: "absolute",
  },
  listContainer: {
    paddingHorizontal: 10,
  },
});

export default Trending;
