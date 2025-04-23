import React from "react";
import { StyleSheet, View, Text, ScrollView, Linking, Pressable } from "react-native";
import { useTheme } from "@/context/theme-context";
import { Image } from "expo-image";
import Constants from "expo-constants";
import { Github, Globe } from "lucide-react-native";
import { Footer } from "@/components/Footer";

export default function AboutScreen() {
  const { colors } = useTheme();
  const appVersion = Constants.expoConfig?.version || "1.0.0";

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?q=80&w=256&auto=format&fit=crop" }}
          style={styles.logo}
        />
        <Text style={[styles.appName, { color: colors.text }]}>Smart IPTV Viewer</Text>
        <Text style={[styles.version, { color: colors.textSecondary }]}>Version {appVersion}</Text>
      </View>

      <View style={[styles.developerCard, { backgroundColor: colors.card }]}>
        <Image
          source={{ uri: "https://avatars.githubusercontent.com/u/88510650?v=4" }}
          style={styles.developerImage}
        />
        
        <View style={styles.developerInfo}>
          <Text style={[styles.developerName, { color: colors.text }]}>
            JehadurRE
          </Text>
          
          <Text style={[styles.developerCompany, { color: colors.textSecondary }]}>
            CyArm
          </Text>
          
          <View style={styles.flagContainer}>
            <Text style={styles.flag}>🇧🇩</Text>
            <Text style={styles.flag}>🇵🇸</Text>
          </View>
          
          <View style={styles.developerLinks}>
            <Pressable 
              style={[styles.linkButton, { backgroundColor: colors.primary }]}
              onPress={() => handleOpenLink("https://github.com/JehadurRE")}
            >
              <Github size={16} color={colors.white} style={styles.linkIcon} />
              <Text style={[styles.linkText, { color: colors.white }]}>GitHub</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.linkButton, { backgroundColor: colors.primary }]}
              onPress={() => handleOpenLink("https://www.jehadurre.me")}
            >
              <Globe size={16} color={colors.white} style={styles.linkIcon} />
              <Text style={[styles.linkText, { color: colors.white }]}>Website</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
          Smart IPTV Viewer is a modern, user-friendly application for watching IPTV channels on your device. 
          It supports standard M3U playlists and provides a seamless viewing experience.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Support for M3U and M3U8 playlists
            </Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Categorized channel browsing
            </Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Favorites and recently watched
            </Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Dark mode support
            </Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Automatic playlist updates
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Disclaimer</Text>
        <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
          This app does not provide any IPTV content. It is a player for M3U playlists that you provide. 
          The developers are not responsible for the content accessed through this application.
          Please ensure you have the right to access any content you stream.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy</Text>
        <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
          Smart IPTV Viewer respects your privacy. We do not collect or store any personal data. 
          All your playlists and preferences are stored locally on your device.
        </Text>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
  },
  developerCard: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  developerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  developerInfo: {
    flex: 1,
  },
  developerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  developerCompany: {
    fontSize: 14,
    marginBottom: 8,
  },
  flagContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  developerLinks: {
    flexDirection: "row",
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  linkIcon: {
    marginRight: 4,
  },
  linkText: {
    fontSize: 12,
    fontWeight: "500",
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
  },
});