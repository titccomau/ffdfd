import React, { useEffect, useCallback } from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/theme-context";
import { usePlaylistStore } from "@/store/playlist-store";
import { useRecentlyWatchedStore } from "@/store/recently-watched-store";
import { CategoryList } from "@/components/CategoryList";
import { ChannelCard } from "@/components/ChannelCard";
import { PlaylistStatus } from "@/components/PlaylistStatus";
import { Footer } from "@/components/Footer";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { playlists, fetchPlaylists, loading, error } = usePlaylistStore();
  const { recentlyWatched } = useRecentlyWatchedStore();

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handleRefresh = useCallback(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handleChannelPress = (channelId: string) => {
    router.push(`/player?id=${channelId}`);
  };

  const allChannels = playlists.flatMap(playlist => playlist.channels || []);
  const featuredChannels = allChannels.slice(0, 10);
  const categories = [...new Set(allChannels.map(channel => channel.category))].slice(0, 5);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        <PlaylistStatus />

        {loading && !allChannels.length ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.text }]}>
              Loading channels...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: colors.error }]}>
              {error}
            </Text>
            <Pressable
              style={[styles.retryButton, { backgroundColor: colors.primary }]}
              onPress={handleRefresh}
            >
              <Text style={[styles.retryButtonText, { color: colors.white }]}>
                Retry
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            {recentlyWatched.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Continue Watching
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.channelRow}>
                    {recentlyWatched.map(channelId => {
                      const channel = allChannels.find(c => c.id === channelId);
                      if (!channel) return null;
                      return (
                        <ChannelCard
                          key={channel.id}
                          channel={channel}
                          onPress={() => handleChannelPress(channel.id)}
                        />
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            )}

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Featured Channels
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.channelRow}>
                  {featuredChannels.map(channel => (
                    <ChannelCard
                      key={channel.id}
                      channel={channel}
                      onPress={() => handleChannelPress(channel.id)}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>

            {categories.map(category => (
              <CategoryList
                key={category}
                category={category}
                channels={allChannels.filter(c => c.category === category).slice(0, 10)}
                onChannelPress={handleChannelPress}
              />
            ))}
            
            <Footer />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 300,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  channelRow: {
    flexDirection: "row",
    gap: 12,
  },
});