import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/context/theme-context";
import { Channel } from "@/types/channel";
import { useFavoritesStore } from "@/store/favorites-store";
import { Heart } from "lucide-react-native";

type ChannelCardProps = {
  channel: Channel;
  onPress: () => void;
};

export function ChannelCard({ channel, onPress }: ChannelCardProps) {
  const { colors } = useTheme();
  const { favorites } = useFavoritesStore();
  const isFavorite = favorites.includes(channel.id);

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {channel.logo ? (
          <Image
            source={{ uri: channel.logo }}
            style={styles.logo}
            contentFit="contain"
            transition={200}
          />
        ) : (
          <View style={[styles.placeholderLogo, { backgroundColor: colors.border }]}>
            <Text style={[styles.placeholderText, { color: colors.text }]}>
              {channel.name.substring(0, 2).toUpperCase()}
            </Text>
          </View>
        )}
        {isFavorite && (
          <View style={[styles.favoriteIcon, { backgroundColor: colors.primary }]}>
            <Heart size={12} color={colors.white} fill={colors.white} />
          </View>
        )}
      </View>
      <Text
        style={[styles.name, { color: colors.text }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {channel.name}
      </Text>
      <Text style={[styles.category, { color: colors.textSecondary }]}>
        {channel.category}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    borderRadius: 12,
    overflow: "hidden",
  },
  imageContainer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logo: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  placeholderLogo: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  favoriteIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  category: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});