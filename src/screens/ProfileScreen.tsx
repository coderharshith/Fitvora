import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Typography } from '../components/Typography';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';

export const ProfileScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appHeader}>
         <View />
         <Typography variant="body" weight="bold">Profile</Typography>
         <TouchableOpacity>
            <MaterialCommunityIcons name="cog-outline" size={28} color={colors.text} />
         </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={48} color={colors.background} />
          </View>
          <Typography variant="pageHeading" weight="bold" style={{marginTop: 16}}>{user.name || 'Guest User'}</Typography>
          <Typography variant="body" color={colors.textSecondary}>{user.email || 'guest@fitvora.app'}</Typography>
        </View>

        {/* Physical Details */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Typography variant="largeHeading" weight="bold">{user.age || '--'}</Typography>
            <Typography variant="small" color={colors.textSecondary}>Age</Typography>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Typography variant="largeHeading" weight="bold">{user.weight || '--'}</Typography>
            <Typography variant="small" color={colors.textSecondary}>Weight (kg)</Typography>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Typography variant="largeHeading" weight="bold">{user.height || '--'}</Typography>
            <Typography variant="small" color={colors.textSecondary}>Height (cm)</Typography>
          </View>
        </View>

        {/* Health Metrics */}
        <Typography variant="body" weight="bold" style={styles.sectionTitle}>Health Metrics</Typography>
        <View style={styles.metricsGrid}>
          <Card style={styles.metricCard}>
            <View style={styles.metricIconWrap}>
              <MaterialCommunityIcons name="scale-balance" size={24} color={colors.background} />
            </View>
            <View>
              <Typography variant="small" color={colors.textSecondary}>BMI</Typography>
              <Typography variant="largeHeading" weight="bold">{user.bmi || '--'}</Typography>
            </View>
          </Card>
          
          <Card style={styles.metricCard}>
            <View style={styles.metricIconWrap}>
              <MaterialCommunityIcons name="fire" size={24} color={colors.background} />
            </View>
            <View>
              <Typography variant="small" color={colors.textSecondary}>BMR</Typography>
              <Typography variant="largeHeading" weight="bold">{user.bmr || '--'}</Typography>
            </View>
          </Card>

          <Card style={styles.metricCardFull}>
            <View style={styles.metricIconWrap}>
              <MaterialCommunityIcons name="lightning-bolt" size={24} color={colors.background} />
            </View>
            <View style={{flex: 1, marginLeft: 16}}>
              <Typography variant="small" color={colors.textSecondary}>TDEE (Daily Calorie Target)</Typography>
              <Typography variant="largeHeading" weight="bold">{user.tdee || '--'} <Typography variant="body" color={colors.textSecondary}>kcal</Typography></Typography>
            </View>
          </Card>
        </View>

        {/* Preferences */}
        <Typography variant="body" weight="bold" style={styles.sectionTitle}>Preferences</Typography>
        <Card style={styles.preferenceCard}>
           <View style={styles.prefRow}>
             <Typography variant="body" color={colors.textSecondary}>Goal</Typography>
             <Typography variant="body" weight="bold" style={{textTransform: 'capitalize'}}>{user.goal || 'Not Set'}</Typography>
           </View>
           <View style={styles.prefDivider} />
           <View style={styles.prefRow}>
             <Typography variant="body" color={colors.textSecondary}>Activity Level</Typography>
             <Typography variant="body" weight="bold" style={{textTransform: 'capitalize'}}>{user.activity || 'Not Set'}</Typography>
           </View>
           <View style={styles.prefDivider} />
           <View style={styles.prefRow}>
             <Typography variant="body" color={colors.textSecondary}>Diet Type</Typography>
             <Typography variant="body" weight="bold" style={{textTransform: 'capitalize'}}>{user.preference || 'Not Set'}</Typography>
           </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 24,
    borderRadius: 24,
    marginBottom: 32,
  },
  statBox: {
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  metricCard: {
    width: '47%',
    marginBottom: 16,
    padding: 20,
    borderRadius: 24,
  },
  metricCardFull: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
  },
  metricIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  preferenceCard: {
    padding: 24,
    borderRadius: 24,
  },
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  prefDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  }
});
