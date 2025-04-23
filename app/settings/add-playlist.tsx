import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/theme-context";
import { usePlaylistStore } from "@/store/playlist-store";
import { fetchM3uPlaylist } from "@/utils/m3u-parser";
import { Footer } from "@/components/Footer";

export default function AddPlaylistScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { addPlaylist } = usePlaylistStore();
  
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleAddPlaylist = async () => {
    if (!url) {
      setError("Please enter a valid M3U playlist URL");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const playlist = await fetchM3uPlaylist(url, name);
      addPlaylist(playlist);
      router.back();
    } catch (err) {
      setError("Failed to load playlist. Please check the URL and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Playlist Name (Optional)</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border
            }
          ]}
          placeholder="My IPTV Playlist"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
        
        <Text style={[styles.label, { color: colors.text }]}>M3U Playlist URL</Text>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border
            }
          ]}
          placeholder="https://example.com/playlist.m3u"
          placeholderTextColor={colors.textSecondary}
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          keyboardType="url"
        />
        
        {error && (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error}
          </Text>
        )}
        
        <Pressable
          style={[
            styles.addButton,
            { backgroundColor: colors.primary },
            loading && { opacity: 0.7 }
          ]}
          onPress={handleAddPlaylist}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={[styles.addButtonText, { color: colors.white }]}>
              Add Playlist
            </Text>
          )}
        </Pressable>
      </View>
      
      <View style={styles.helpSection}>
        <Text style={[styles.helpTitle, { color: colors.text }]}>
          How to add a playlist
        </Text>
        <Text style={[styles.helpText, { color: colors.textSecondary }]}>
          1. Enter a name for your playlist (optional)
        </Text>
        <Text style={[styles.helpText, { color: colors.textSecondary }]}>
          2. Enter the URL of your M3U playlist
        </Text>
        <Text style={[styles.helpText, { color: colors.textSecondary }]}>
          3. Tap "Add Playlist" to import your channels
        </Text>
        <Text style={[styles.helpNote, { color: colors.textSecondary }]}>
          Note: The app supports standard M3U and M3U8 playlists. Make sure your playlist URL is accessible.
        </Text>
      </View>
      
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 16,
  },
  addButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  helpSection: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  helpText: {
    fontSize: 14,
    marginBottom: 8,
  },
  helpNote: {
    fontSize: 14,
    marginTop: 8,
    fontStyle: "italic",
  },
});