import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/context/theme-context";
import { Channel } from "@/types/channel";
import { Heart, Play } from "lucide-react-native";

type ChannelListItemProps = {
  channel: Channel;
  onPress: () => void;
  isFavorite?: boolean;
};

export function ChannelListItem({ channel, onPress, isFavorite }: ChannelListItemProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <View style={styles.logoContainer}>
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
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {channel.name}
        </Text>
        <Text style={[styles.category, { color: colors.textSecondary }]}>
          {channel.category}
        </Text>
      </View>
      
      <View style={styles.actions}>
        {isFavorite && (
          <Heart size={16} color={colors.primary} fill={colors.primary} style={styles.favoriteIcon} />
        )}
        <View style={[styles.playButton, { backgroundColor: colors.primary }]}>
          <Play size={16} color={colors.white} fill={colors.white} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 12,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteIcon: {
    marginRight: 12,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});