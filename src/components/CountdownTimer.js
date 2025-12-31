import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { getTimeUntilNewYear } from '../utils/dateUtils';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilNewYear());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <View style={styles.container}>
      {timeUnits.map((unit, index) => (
        <View key={index} style={styles.timeBox}>
          <Text style={styles.value}>{unit.value || 0}</Text>
          <Text style={styles.label}>{unit.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  timeBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  label: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
