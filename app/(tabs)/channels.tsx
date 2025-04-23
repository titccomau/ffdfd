import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/theme-context";
import { usePlaylistStore } from "@/store/playlist-store";
import { ChannelListItem } from "@/components/ChannelListItem";
import { PlaylistStatus } from "@/components/PlaylistStatus";
import { Footer } from "@/components/Footer";

export default function ChannelsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { playlists, loading } = usePlaylistStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allChannels = playlists.flatMap(playlist => playlist.channels || []);
  const categories = [...new Set(allChannels.map(channel => channel.category))].sort();
  
  const filteredChannels = selectedCategory
    ? allChannels.filter(channel => channel.category === selectedCategory)
    : allChannels;

  const handleChannelPress = (channelId: string) => {
    router.push(`/player?id=${channelId}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <PlaylistStatus />
      
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={[
              styles.categoryButton,
              !selectedCategory && { backgroundColor: colors.primary },
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                { color: !selectedCategory ? colors.white : colors.text },
              ]}
            >
              All
            </Text>
          </Pressable>
          
          {categories.map(category => (
            <Pressable
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && { backgroundColor: colors.primary },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  { color: selectedCategory === category ? colors.white : colors.text },
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {loading && !allChannels.length ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Loading channels...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredChannels}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ChannelListItem
              channel={item}
              onPress={() => handleChannelPress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                No channels found. Add a playlist in Settings.
              </Text>
            </View>
          }
          ListFooterComponent={<Footer />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});