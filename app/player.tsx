import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Pressable, ActivityIndicator, Platform } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/theme-context";
import { usePlaylistStore } from "@/store/playlist-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { useRecentlyWatchedStore } from "@/store/recently-watched-store";
import { 
  ArrowLeft, 
  Heart, 
  Maximize2, 
  Pause, 
  Play, 
  SkipBack, 
  SkipForward,
  Volume2,
  VolumeX
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function PlayerScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { playlists } = usePlaylistStore();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const { addToRecentlyWatched } = useRecentlyWatchedStore();
  
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [controlsVisible, setControlsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  
  const allChannels = playlists.flatMap(playlist => playlist.channels || []);
  const channel = allChannels.find(c => c.id === id);
  
  const isFavorite = favorites.includes(id || "");
  
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (id) {
      addToRecentlyWatched(id);
    }
    
    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [id, addToRecentlyWatched]);

  const hideControlsWithDelay = () => {
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    
    controlsTimeout.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  };

  const showControls = () => {
    setControlsVisible(true);
    hideControlsWithDelay();
  };

  const handlePlaybackStatusUpdate = (playbackStatus: any) => {
    setStatus(playbackStatus);
    
    if (playbackStatus.isLoaded) {
      setLoading(false);
      setError(null);
    } else if (playbackStatus.error) {
      setError("An error occurred while playing this stream.");
      setLoading(false);
    }
  };

  const handleError = () => {
    setError("Failed to load the stream. Please try again later.");
    setLoading(false);
  };

  const togglePlayPause = async () => {
    if (status.isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
    showControls();
  };

  const toggleMute = async () => {
    setMuted(!muted);
    await videoRef.current?.setIsMutedAsync(!muted);
    showControls();
  };

  const handleBack = () => {
    router.back();
  };

  const handleFavoriteToggle = () => {
    if (id) {
      toggleFavorite(id);
      showControls();
    }
  };

  const handleFullscreen = async () => {
    if (Platform.OS !== "web") {
      if (videoRef.current) {
        await videoRef.current.presentFullscreenPlayer();
      }
    }
    showControls();
  };

  if (!channel) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Channel not found</Text>
        <Pressable
          style={[styles.backButton, { backgroundColor: colors.primary }]}
          onPress={handleBack}
        >
          <Text style={[styles.backButtonText, { color: colors.white }]}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar hidden />
      
      <Pressable style={styles.videoContainer} onPress={showControls}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: channel.url }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          onError={handleError}
          isMuted={muted}
        />
        
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.white} />
            <Text style={styles.loadingText}>Loading stream...</Text>
          </View>
        )}
        
        {error && (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable
              style={[styles.retryButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                setLoading(true);
                setError(null);
                videoRef.current?.loadAsync({ uri: channel.url }, {}, true);
              }}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
          </View>
        )}
        
        {controlsVisible && (
          <View style={styles.controlsContainer}>
            <LinearGradient
              colors={["rgba(0,0,0,0.7)", "transparent"]}
              style={styles.topGradient}
            >
              <SafeAreaView edges={["top"]} style={styles.topControls}>
                <Pressable onPress={handleBack} style={styles.backButtonControl}>
                  <ArrowLeft size={24} color={colors.white} />
                </Pressable>
                <Text style={styles.channelTitle} numberOfLines={1}>
                  {channel.name}
                </Text>
                <Pressable onPress={handleFavoriteToggle} style={styles.favoriteButton}>
                  <Heart
                    size={24}
                    color={colors.white}
                    fill={isFavorite ? colors.white : "none"}
                  />
                </Pressable>
              </SafeAreaView>
            </LinearGradient>
            
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              style={styles.bottomGradient}
            >
              <SafeAreaView edges={["bottom"]} style={styles.bottomControls}>
                <View style={styles.playbackControls}>
                  <Pressable style={styles.controlButton} onPress={togglePlayPause}>
                    {status.isPlaying ? (
                      <Pause size={28} color={colors.white} />
                    ) : (
                      <Play size={28} color={colors.white} />
                    )}
                  </Pressable>
                  
                  <Pressable style={styles.controlButton} onPress={toggleMute}>
                    {muted ? (
                      <VolumeX size={24} color={colors.white} />
                    ) : (
                      <Volume2 size={24} color={colors.white} />
                    )}
                  </Pressable>
                  
                  <View style={styles.spacer} />
                  
                  <Pressable style={styles.controlButton} onPress={handleFullscreen}>
                    <Maximize2 size={24} color={colors.white} />
                  </Pressable>
                </View>
              </SafeAreaView>
            </LinearGradient>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  video: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  loadingText: {
    color: "#fff",
    marginTop: 16,
    fontSize: 16,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  topGradient: {
    height: 100,
  },
  bottomGradient: {
    height: 100,
    justifyContent: "flex-end",
  },
  topControls: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButtonControl: {
    padding: 8,
  },
  channelTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  favoriteButton: {
    padding: 8,
  },
  bottomControls: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  playbackControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    padding: 12,
  },
  spacer: {
    flex: 1,
  },
});