import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/theme-context";
import { usePlaylistStore } from "@/store/playlist-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { ChannelListItem } from "@/components/ChannelListItem";
import { Heart } from "lucide-react-native";
import { Footer } from "@/components/Footer";

export default function FavoritesScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { playlists } = usePlaylistStore();
  const { favorites } = useFavoritesStore();

  const allChannels = playlists.flatMap(playlist => playlist.channels || []);
  const favoriteChannels = allChannels.filter(channel => favorites.includes(channel.id));

  const handleChannelPress = (channelId: string) => {
    router.push(`/player?id=${channelId}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <FlatList
        data={favoriteChannels}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChannelListItem
            channel={item}
            onPress={() => handleChannelPress(item.id)}
            isFavorite={true}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Heart size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No favorites yet
            </Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Add channels to your favorites by tapping the heart icon while watching.
            </Text>
          </View>
        }
        ListFooterComponent={<Footer />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 300,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    maxWidth: 300,
  },
});