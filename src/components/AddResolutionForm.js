import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { COLORS } from '../constants/colors';

export default function AddResolutionForm({ onAdd, onCancel }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter your resolution..."
        placeholderTextColor={COLORS.textSecondary}
        multiline
        autoFocus
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={handleAdd}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    color: COLORS.text,
    fontSize: 16,
    minHeight: 60,
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: COLORS.purple,
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  buttonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
});
