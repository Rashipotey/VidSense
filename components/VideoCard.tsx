import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { icons } from "../constants";

interface VideoCardProps {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.creator} numberOfLines={1}>
              {creator}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.menuIcon}>
          <Image source={icons.menu} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if ("didJustFinish" in status && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={styles.thumbnailContainer}
        >
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />
          <Image source={icons.play} style={styles.playIcon} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    width: 46,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#888", // Adjust color to match secondary
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  creator: {
    fontSize: 12,
    color: "#AAAAAA",
  },
  menuIcon: {
    padding: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  video: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginTop: 12,
  },
  thumbnailContainer: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  playIcon: {
    width: 48,
    height: 48,
    position: "absolute",
  },
});

export default VideoCard;
