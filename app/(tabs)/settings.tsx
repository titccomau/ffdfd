import React from "react";
import { StyleSheet, View, Text, ScrollView, Switch, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/theme-context";
import { usePlaylistStore } from "@/store/playlist-store";
import { 
  Plus, 
  Moon, 
  Sun, 
  Trash2, 
  RefreshCw, 
  Info, 
  ChevronRight,
  Clock
} from "lucide-react-native";
import { Footer } from "@/components/Footer";

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { playlists, removePlaylist, fetchPlaylists, loading } = usePlaylistStore();
  const isDarkMode = theme === "dark";

  const { colors } = useTheme();

  const handleAddPlaylist = () => {
    router.push("/settings/add-playlist");
  };

  const handleAbout = () => {
    router.push("/settings/about");
  };

  const handleUpdateSettings = () => {
    router.push("/settings/update-settings");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
          <View style={[styles.settingItem, { backgroundColor: colors.card }]}>
            <View style={styles.settingContent}>
              {isDarkMode ? (
                <Moon size={20} color={colors.text} style={styles.settingIcon} />
              ) : (
                <Sun size={20} color={colors.text} style={styles.settingIcon} />
              )}
              <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Playlists</Text>
            <Pressable
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={handleAddPlaylist}
            >
              <Plus size={16} color={colors.white} />
              <Text style={[styles.addButtonText, { color: colors.white }]}>Add</Text>
            </Pressable>
          </View>

          {playlists.length === 0 ? (
            <View style={[styles.emptyPlaylists, { backgroundColor: colors.card }]}>
              <Text style={[styles.emptyPlaylistsText, { color: colors.textSecondary }]}>
                No playlists added yet. Add your first M3U playlist.
              </Text>
            </View>
          ) : (
            playlists.map((playlist, index) => (
              <View 
                key={playlist.id} 
                style={[
                  styles.playlistItem, 
                  { backgroundColor: colors.card },
                  index === playlists.length - 1 && styles.lastItem
                ]}
              >
                <View style={styles.playlistInfo}>
                  <Text style={[styles.playlistName, { color: colors.text }]}>
                    {playlist.name || "Unnamed Playlist"}
                  </Text>
                  <Text style={[styles.playlistUrl, { color: colors.textSecondary }]}>
                    {playlist.url}
                  </Text>
                  <Text style={[styles.playlistStats, { color: colors.textSecondary }]}>
                    {playlist.channels?.length || 0} channels • Last updated: {
                      playlist.lastUpdated 
                        ? new Date(playlist.lastUpdated).toLocaleString() 
                        : "Never"
                    }
                  </Text>
                </View>
                <View style={styles.playlistActions}>
                  <Pressable 
                    style={styles.playlistAction}
                    onPress={() => fetchPlaylists(playlist.id)}
                    disabled={loading}
                  >
                    <RefreshCw 
                      size={20} 
                      color={loading ? colors.textSecondary : colors.primary} 
                    />
                  </Pressable>
                  <Pressable 
                    style={styles.playlistAction}
                    onPress={() => removePlaylist(playlist.id)}
                  >
                    <Trash2 size={20} color={colors.error} />
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>

        <Pressable 
          style={[styles.menuButton, { backgroundColor: colors.card }]}
          onPress={handleUpdateSettings}
        >
          <View style={styles.menuContent}>
            <Clock size={20} color={colors.text} style={styles.settingIcon} />
            <Text style={[styles.settingText, { color: colors.text }]}>Update Settings</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </Pressable>

        <Pressable 
          style={[styles.menuButton, { backgroundColor: colors.card }]}
          onPress={handleAbout}
        >
          <View style={styles.menuContent}>
            <Info size={20} color={colors.text} style={styles.settingIcon} />
            <Text style={[styles.settingText, { color: colors.text }]}>About</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </Pressable>
        
        <Footer />
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
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  emptyPlaylists: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  emptyPlaylistsText: {
    fontSize: 14,
    textAlign: "center",
  },
  playlistItem: {
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
  },
  lastItem: {
    marginBottom: 0,
  },
  playlistInfo: {
    flex: 1,
    marginBottom: 8,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  playlistUrl: {
    fontSize: 14,
    marginBottom: 4,
  },
  playlistStats: {
    fontSize: 12,
  },
  playlistActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  playlistAction: {
    padding: 8,
    marginLeft: 8,
  },
  menuButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});