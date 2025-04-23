import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from "react-native";
import { useTheme } from "@/context/theme-context";
import { 
  getUpdateInterval, 
  setUpdateInterval, 
  UPDATE_INTERVALS,
  performUpdate,
  getLastUpdateTime
} from "@/utils/background-fetch";
import { RefreshCw, Check } from "lucide-react-native";
import { Footer } from "@/components/Footer";

export default function UpdateSettingsScreen() {
  const { colors } = useTheme();
  const [selectedInterval, setSelectedInterval] = useState<number | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const interval = await getUpdateInterval();
      const lastUpdate = await getLastUpdateTime();
      setSelectedInterval(interval);
      setLastUpdateTime(lastUpdate);
      setLoading(false);
    };

    loadSettings();
  }, []);

  const handleIntervalSelect = async (value: number) => {
    setSelectedInterval(value);
    await setUpdateInterval(value);
  };

  const handleManualUpdate = async () => {
    setUpdating(true);
    setUpdateSuccess(null);
    
    try {
      const success = await performUpdate();
      setUpdateSuccess(success);
      
      if (success) {
        // Refresh the last update time
        const lastUpdate = await getLastUpdateTime();
        setLastUpdateTime(lastUpdate);
      }
    } catch (error) {
      console.error("Manual update failed:", error);
      setUpdateSuccess(false);
    } finally {
      setUpdating(false);
    }
  };

  const formatLastUpdateTime = () => {
    if (!lastUpdateTime) {
      return "Never";
    }
    
    return new Date(lastUpdateTime).toLocaleString();
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Update Frequency
        </Text>
        <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
          Choose how often the app should check for playlist updates
        </Text>
        
        {UPDATE_INTERVALS.map((interval) => (
          <Pressable
            key={interval.value}
            style={[
              styles.intervalOption,
              { backgroundColor: colors.card },
              selectedInterval === interval.value && { borderColor: colors.primary, borderWidth: 2 }
            ]}
            onPress={() => handleIntervalSelect(interval.value)}
          >
            <Text style={[styles.intervalLabel, { color: colors.text }]}>
              {interval.label}
            </Text>
            {selectedInterval === interval.value && (
              <Check size={20} color={colors.primary} />
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Manual Update
        </Text>
        <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
          Last checked: {formatLastUpdateTime()}
        </Text>
        
        <Pressable
          style={[styles.updateButton, { backgroundColor: colors.primary }]}
          onPress={handleManualUpdate}
          disabled={updating}
        >
          {updating ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <>
              <RefreshCw size={20} color={colors.white} style={styles.buttonIcon} />
              <Text style={[styles.updateButtonText, { color: colors.white }]}>
                Update Now
              </Text>
            </>
          )}
        </Pressable>
        
        {updateSuccess !== null && (
          <Text 
            style={[
              styles.updateStatus, 
              { color: updateSuccess ? colors.success : colors.error }
            ]}
          >
            {updateSuccess 
              ? "Playlists updated successfully!" 
              : "Failed to update playlists. Please try again."}
          </Text>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  intervalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  intervalLabel: {
    fontSize: 16,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  updateStatus: {
    marginTop: 16,
    fontSize: 14,
    textAlign: "center",
  },
});