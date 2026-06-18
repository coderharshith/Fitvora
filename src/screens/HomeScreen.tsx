import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Typography } from '../components/Typography';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

// SVG Path placeholders for rings (Simplified with CSS border radius for MVP to avoid heavy SVG deps)
const ProgressRing = ({ label, current, total, unit, size = 64, icon }: any) => {
  const percentage = Math.min((parseFloat(current) / parseFloat(total)) * 100, 100);
  
  return (
    <View style={styles.ringContainer}>
      <View style={[styles.ringOuter, { width: size, height: size, borderRadius: size / 2 }]}>
        <View style={[styles.ringProgress, { borderRadius: size / 2, height: `${percentage}%` }]} />
        <View style={[styles.ringInner, { width: size - 8, height: size - 8, borderRadius: (size - 8) / 2 }]}>
           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
             <MaterialCommunityIcons name={icon} size={24} color={colors.text} />
           </View>
        </View>
      </View>
      <Typography variant="body" weight="bold" style={styles.ringCurrent}>{current}</Typography>
      <Typography variant="small" color={colors.textSecondary} style={styles.ringTotal}>/ {total} {unit}</Typography>
      <Typography variant="small" weight="medium" style={styles.ringLabel}>{label}</Typography>
    </View>
  );
};

export const HomeScreen = ({ navigation }: any) => {
  const userName = useSelector((state: RootState) => state.user.name);

  const meals = [
    { name: 'Breakfast', icon: 'weather-sunny', item: 'Oats Bowl', cals: '450 kcal' },
    { name: 'Snack', icon: 'food-apple-outline', item: 'Greek Yogurt', cals: '150 kcal' },
    { name: 'Lunch', icon: 'silverware', item: 'Chicken Bowl', cals: '650 kcal' },
    { name: 'Evening Snack', icon: 'cup-outline', item: 'Protein Shake', cals: '200 kcal' },
    { name: 'Dinner', icon: 'bowl-mix-outline', item: 'Paneer Bowl', cals: '250 kcal' },
  ];

  const actions = [
    { name: 'Weight Tracker', icon: 'scale-bathroom' },
    { name: 'Water Tracker', icon: 'water-outline' },
    { name: 'Calorie Tracker', icon: 'chart-bar' },
    { name: 'My Orders', icon: 'clipboard-text-outline' },
    { name: 'Ask Coach', icon: 'chat-processing-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Header */}
      <View style={styles.appHeader}>
         <TouchableOpacity><MaterialCommunityIcons name="menu" size={28} color={colors.text} /></TouchableOpacity>
         <View style={styles.logoContainer}>
            <Typography variant="body" weight="bold" style={styles.logoText}>FITVORA</Typography>
            <Typography variant="small" style={styles.logoSubtext}>FUEL YOUR GOALS</Typography>
         </View>
         <TouchableOpacity><MaterialCommunityIcons name="bell-outline" size={28} color={colors.text} /></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Welcome Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="body" weight="bold">Good Morning,</Typography>
            <Typography variant="largeHeading" weight="bold" style={styles.nameHeading}>{userName || 'Guest'} 👋</Typography>
            <Typography variant="small" color={colors.textSecondary} style={styles.subtitle}>
              Stay consistent, your future self{'\n'}is watching you.
            </Typography>
          </View>
          <Card style={styles.calorieCard}>
             <MaterialCommunityIcons name="fire" size={24} color={colors.text} style={{marginBottom: 4}} />
             <Typography variant="largeHeading" weight="bold">350</Typography>
             <Typography variant="small" weight="medium">Calorie Remaining</Typography>
          </Card>
        </View>

        {/* Today's Progress */}
        <View style={styles.sectionHeader}>
          <Typography variant="sectionHeading" weight="bold">Today's Progress</Typography>
          <TouchableOpacity>
            <Typography variant="small" weight="medium">View Details &gt;</Typography>
          </TouchableOpacity>
        </View>
        <Card style={styles.progressCard}>
          <View style={styles.ringsRow}>
            <ProgressRing label="Calories" current="1850" total="2200" unit="kcal" icon="fire" />
            <ProgressRing label="Protein" current="120" total="150" unit="g" icon="arm-flex-outline" />
            <ProgressRing label="Water" current="2.5" total="4" unit="L" icon="water-outline" />
            <ProgressRing label="Current Weight" current="72.5" total="75" unit="kg" icon="scale-bathroom" />
          </View>
        </Card>

        {/* Today's Meal Plan (Dark Card) */}
        <View style={styles.mealPlanCard}>
          <View style={styles.sectionHeaderDark}>
            <Typography variant="sectionHeading" weight="bold" color={colors.background}>Today's Meal Plan</Typography>
            <TouchableOpacity style={styles.viewPlanBtn} onPress={() => navigation.navigate('Menu')}>
              <Typography variant="small" weight="medium" color={colors.background}>View Meal Plan &gt;</Typography>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mealsScroll}>
            {meals.map((meal, idx) => (
              <View key={idx} style={styles.mealItem}>
                <View style={styles.mealIcon}>
                   <MaterialCommunityIcons name={meal.icon as any} size={20} color={colors.background} />
                </View>
                <Typography variant="small" weight="bold" color={colors.background} style={styles.mealTime}>{meal.name}</Typography>
                <Typography variant="small" color={colors.border}>{meal.item}</Typography>
                <Typography variant="small" color={colors.border} style={styles.mealCals}>{meal.cals}</Typography>
                <View style={styles.checkCircle}>
                   <MaterialCommunityIcons name="check" size={16} color={colors.background} />
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.fullPlanBtn} onPress={() => navigation.navigate('Menu')}>
             <Typography variant="body" weight="bold" color={colors.button}>VIEW FULL MEAL PLAN</Typography>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Typography variant="sectionHeading" weight="bold">Quick Actions</Typography>
          <TouchableOpacity>
            <Typography variant="small" weight="medium">See All &gt;</Typography>
          </TouchableOpacity>
        </View>
        
        <View style={styles.quickActionsGrid}>
           {actions.map((action, idx) => (
             <TouchableOpacity key={idx} onPress={() => navigation.navigate('Menu')}>
               <Card style={styles.actionCard}>
                 <View style={styles.actionIcon}>
                    <MaterialCommunityIcons name={action.icon as any} size={24} color={colors.text} />
                 </View>
                 <Typography variant="small" weight="medium" align="center">{action.name}</Typography>
               </Card>
             </TouchableOpacity>
           ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    letterSpacing: 1,
  },
  logoSubtext: {
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for bottom tab
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  nameHeading: {
    fontSize: 36,
    marginVertical: 4,
  },
  subtitle: {
    lineHeight: 20,
  },
  calorieCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderDark: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  viewPlanBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  progressCard: {
    padding: 20,
    marginBottom: 32,
    borderRadius: 24,
  },
  ringsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ringContainer: {
    alignItems: 'center',
  },
  ringOuter: {
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  ringProgress: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.text,
  },
  ringInner: {
    backgroundColor: colors.card,
    position: 'absolute',
    zIndex: 2,
  },
  ringCurrent: {
    fontSize: 18,
  },
  ringTotal: {
    fontSize: 10,
    marginBottom: 4,
  },
  ringLabel: {
    fontSize: 11,
  },
  mealPlanCard: {
    backgroundColor: colors.text,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
  },
  mealsScroll: {
    marginBottom: 24,
  },
  mealItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 80,
  },
  mealIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealTime: {
    marginBottom: 4,
  },
  mealCals: {
    fontSize: 10,
    marginTop: 2,
    marginBottom: 12,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullPlanBtn: {
    backgroundColor: colors.background,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - 52) / 3, // 3 cols, 20px padding * 2, 12px gap * 2
    aspectRatio: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
