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
  onAddMilestone,
  onToggleMilestone,
  onToggleEmoji
}) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      onUpdateImage(resolution.id, result.assets[0].uri);
    }
  };

  const handleComplete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggleComplete(resolution.id);
  };

  const handleAddMilestone = () => {
    Alert.prompt(
      'New milestone',
      'Write a small step',
      (text) => {
        if (text) onAddMilestone(resolution.id, text);
      }
    );
  };

  return (
    <View style={[styles.card, resolution.completed && styles.completedCard]}>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.checkbox, resolution.completed && styles.checkboxCompleted]} onPress={handleComplete}>
          {resolution.completed && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={[styles.title, resolution.completed && styles.completedText]}>
            {resolution.emoji ? `${resolution.emoji} ` : ''}
            {resolution.text}
          </Text>

          {resolution.image && (
            <Image source={{ uri: resolution.image }} style={styles.image} />
          )}

          {resolution.milestones && resolution.milestones.length > 0 && (
            <View style={styles.milestones}>
              {resolution.milestones.map(milestone => (
                <TouchableOpacity
                  key={milestone.id}
                  style={styles.milestoneRow}
                  onPress={() => onToggleMilestone(resolution.id, milestone.id)}
                >
                  <View style={[styles.milestoneBox, milestone.completed && styles.milestoneBoxDone]}>
                    {milestone.completed && <Text style={styles.milestoneCheck}>✓</Text>}
                  </View>
                  <Text style={[styles.milestoneText, milestone.completed && styles.completedText]}>
                    {milestone.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <Text style={styles.actionText}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleAddMilestone}>
              <Text style={styles.actionText}>Milestone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => onToggleEmoji(resolution.id)}>
              <Text style={styles.actionText}>Icon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => onDelete(resolution.id)}>
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
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  completedCard: {
    backgroundColor: 'rgba(34,197,94,0.07)',
    borderColor: 'rgba(34,197,94,0.14)',
  },
  row: { flexDirection: 'row', gap: 12 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxCompleted: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  check: { color: COLORS.text, fontSize: 16, fontWeight: '900' },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  completedText: { textDecorationLine: 'line-through', color: COLORS.textSecondary },
  image: { width: '100%', height: 170, borderRadius: 12, marginVertical: 10 },

  milestones: { marginTop: 6 },
  milestoneRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 4 },
  milestoneBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneBoxDone: { backgroundColor: COLORS.purple, borderColor: COLORS.purple },
  milestoneCheck: { color: COLORS.text, fontSize: 10, fontWeight: '900' },
  milestoneText: { color: COLORS.textSecondary, fontSize: 13 },

  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  actionText: { color: COLORS.text, fontSize: 12, fontWeight: '600' },
  deleteButton: { backgroundColor: 'rgba(239,68,68,0.16)', borderColor: 'rgba(239,68,68,0.18)' },
  deleteText: { color: COLORS.text, fontSize: 12, fontWeight: '700' },
});
