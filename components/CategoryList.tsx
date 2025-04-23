import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useTheme } from "@/context/theme-context";
import { ChannelCard } from "./ChannelCard";
import { Channel } from "@/types/channel";

type CategoryListProps = {
  category: string;
  channels: Channel[];
  onChannelPress: (channelId: string) => void;
};

export function CategoryList({ category, channels, onChannelPress }: CategoryListProps) {
  const { colors } = useTheme();

  if (channels.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{category}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.channelRow}>
          {channels.map(channel => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              onPress={() => onChannelPress(channel.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  channelRow: {
    flexDirection: "row",
    gap: 12,
  },
});