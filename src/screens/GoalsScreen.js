import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../constants/colors';
import CountdownTimer from '../components/CountdownTimer';
import AddResolutionForm from '../components/AddResolutionForm';
import ResolutionCard from '../components/ResolutionCard';
import { useResolutions } from '../context/ResolutionsContext';

export default function GoalsScreen() {
  const {
    filteredResolutions,
    addResolution,
    toggleComplete,
    deleteResolution,
    updateResolutionImage,
    addMilestone,
    toggleMilestone,
    toggleEmoji,
    streak,
    activeCategory,
    setActiveCategory,
  } = useResolutions();

  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Goals</Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>{streak}</Text>
          </View>
        </View>
        <CountdownTimer />
      </View>

      <View style={styles.categoryBar}>
        {['All', 'General', 'Study', 'Health', 'Personal'].map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[
              styles.categoryChip,
              activeCategory === cat && styles.activeCategory
            ]}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {!showAddForm && (
          <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(true)}>
            <Text style={styles.addButtonText}>Add goal</Text>
          </TouchableOpacity>
        )}

        {showAddForm && (
          <AddResolutionForm
            onAdd={(text) => {
              addResolution(text);
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {filteredResolutions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No goals in this category.</Text>
            <Text style={styles.emptySubtext}>Add one and start building momentum.</Text>
          </View>
        ) : (
          filteredResolutions.map(resolution => (
            <ResolutionCard
              key={resolution.id}
              resolution={resolution}
              onToggleComplete={toggleComplete}
              onDelete={deleteResolution}
              onUpdateImage={updateResolutionImage}
              onAddMilestone={addMilestone}
              onToggleMilestone={toggleMilestone}
              onToggleEmoji={toggleEmoji}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  streakBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(251,146,60,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(251,146,60,0.25)',
  },
  streakText: { color: COLORS.orange, fontWeight: 'bold' },
  categoryBar: { flexDirection: 'row', paddingHorizontal: 12, paddingTop: 12, gap: 8, flexWrap: 'wrap' },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  activeCategory: { backgroundColor: COLORS.purple, borderColor: 'rgba(255,255,255,0.10)' },
  categoryText: { color: COLORS.text, fontSize: 12, fontWeight: '600' },
  content: { paddingHorizontal: 16 },
  addButton: {
    backgroundColor: COLORS.purple,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 16,
  },
  addButtonText: { color: COLORS.text, fontWeight: '700' },
  emptyState: { paddingVertical: 40, alignItems: 'center' },
  emptyText: { color: COLORS.textSecondary, fontSize: 16, marginBottom: 8 },
  emptySubtext: { color: COLORS.textSecondary, fontSize: 13, opacity: 0.9 },
});
