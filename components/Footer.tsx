import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@/context/theme-context";

export function Footer() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.copyright, { color: colors.textSecondary }]}>
        © 2025 JehadurRE@CyArm 🇧🇩 🇵🇸
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  copyright: {
    fontSize: 12,
    textAlign: "center",
  },
});