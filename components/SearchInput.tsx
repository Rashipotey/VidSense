import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert, StyleSheet } from "react-native";

import { icons } from "../constants";

interface SearchInputProps {
  initialQuery: string;
  refetch: () => Promise<void>;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialQuery = "" }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState<string>(initialQuery);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(text: string) => setQuery(text)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query.trim() === "") {
            Alert.alert(
              "Missing Query",
              "Please input something to search results across the database"
            );
            return;
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} style={styles.searchIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#2C2C2C",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  searchIcon: {
    width: 16,
    height: 16,
  },
});

export default SearchInput;
