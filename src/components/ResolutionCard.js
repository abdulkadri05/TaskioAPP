import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { COLORS } from '../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

export default function ResolutionCard({
  resolution,
  onToggleComplete,
  onDelete,
  onUpdateImage,
  onToggleEmoji
}) {

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Camera permission required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      onUpdateImage(resolution.id, result.assets[0].uri);
    }
  };



  const handleComplete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggleComplete(resolution.id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.checkbox} onPress={handleComplete}>
          {resolution.completed && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>
            {resolution.emoji ? `${resolution.emoji} ` : ''}
            {resolution.text}
          </Text>

          {resolution.image && (
            <Image source={{ uri: resolution.image }} style={styles.image} />
          )}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
              <Text style={styles.actionText}>Take photo</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onToggleEmoji(resolution.id)}
            >
              <Text style={styles.actionText}>Icon</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => onDelete(resolution.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  row: { flexDirection: 'row', gap: 12 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: { color: COLORS.text, fontWeight: '900' },
  content: { flex: 1 },
  title: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  image: { width: '100%', height: 170, borderRadius: 12, marginVertical: 10 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionText: { color: COLORS.text, fontSize: 12 },
  deleteButton: { backgroundColor: 'rgba(239,68,68,0.2)' },
  deleteText: { color: COLORS.text, fontWeight: '700' },
});
