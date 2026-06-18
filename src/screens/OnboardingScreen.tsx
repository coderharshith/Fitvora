import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Typography } from '../components/Typography';
import { colors } from '../theme/colors';

const GOALS = [
  { id: 'loss', title: 'Weight Loss', desc: 'Burn fat and lose weight', icon: 'fire' },
  { id: 'gain', title: 'Weight Gain', desc: 'Gain healthy weight', icon: 'trending-up' },
  { id: 'muscle', title: 'Muscle Gain', desc: 'Build muscle and strength', icon: 'arm-flex' },
  { id: 'maintain', title: 'Maintenance', desc: 'Maintain current weight', icon: 'scale-balance' },
];

const ACTIVITIES = [
  { id: 'sedentary', title: 'Sedentary', desc: 'Little or no exercise', multiplier: 1.2, icon: 'chair-rolling' },
  { id: 'light', title: 'Lightly Active', desc: 'Light exercise 1-3 days/week', multiplier: 1.375, icon: 'walk' },
  { id: 'moderate', title: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week', multiplier: 1.55, icon: 'run' },
  { id: 'very', title: 'Very Active', desc: 'Hard exercise 6-7 days/week', multiplier: 1.725, icon: 'weight-lifter' },
];

const PREFERENCES = [
  { id: 'veg', title: 'Vegetarian', desc: 'No meat, fish or eggs', icon: 'leaf' },
  { id: 'nonveg', title: 'Non-Vegetarian', desc: 'Includes meat, fish and eggs', icon: 'food-drumstick' },
  { id: 'vegan', title: 'Vegan', desc: 'No animal products at all', icon: 'sprout' },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('muscle');
  const [activity, setActivity] = useState('moderate');
  const [preference, setPreference] = useState('nonveg');
  
  // User Metrics
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male'); // Default
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleNext = () => {
    if (step === 2) {
      if (!name || !age || !height || !weight) {
        alert("Please fill in all fields to continue.");
        return;
      }
    }
    if (step < 5) {
      setStep(step + 1);
    } else {
      navigation.replace('MainTabs');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateHealthMetrics = () => {
    const h = parseFloat(height) / 100; // in meters
    const w = parseFloat(weight);
    const a = parseInt(age);
    
    // BMI
    const bmi = w / (h * h);
    let bmiStatus = 'Normal';
    if (bmi < 18.5) bmiStatus = 'Underweight';
    else if (bmi > 25) bmiStatus = 'Overweight';

    // BMR (Mifflin-St Jeor)
    let bmr = 10 * w + 6.25 * parseFloat(height) - 5 * a;
    if (gender === 'Male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // TDEE
    const actObj = ACTIVITIES.find(ac => ac.id === activity) || ACTIVITIES[0];
    let tdee = bmr * actObj.multiplier;
    
    // Goal adjustments
    if (goal === 'loss') tdee -= 500;
    else if (goal === 'gain' || goal === 'muscle') tdee += 500;

    // Macros
    const protein = Math.round((w * 2)); // rough 2g/kg
    const fat = Math.round((tdee * 0.25) / 9); // 25% of cals from fat
    const carbs = Math.round((tdee - (protein * 4) - (fat * 9)) / 4);

    return {
      bmi: bmi.toFixed(1),
      bmiStatus,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      protein,
      carbs,
      fat
    };
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {[1, 2, 3, 4, 5].map((i) => (
        <View 
          key={i} 
          style={[styles.progressDot, i === step ? styles.progressDotActive : {}]} 
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {step > 1 ? (
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Typography variant="body" weight="bold">&lt;</Typography>
          </TouchableOpacity>
        ) : <View style={{width: 40}} />}
        {renderProgressBar()}
        <View style={{width: 40}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && (
          <View>
            <Typography variant="pageHeading" weight="bold" style={styles.title}>What is your main goal?</Typography>
            <Typography variant="body" color={colors.textSecondary} style={styles.subtitle}>
              This helps us create the perfect plan for you.
            </Typography>
            {GOALS.map((g) => (
              <TouchableOpacity 
                key={g.id}
                style={[styles.optionCard, goal === g.id && styles.optionCardActive]}
                onPress={() => setGoal(g.id)}
              >
                <View style={[styles.optionIconPlaceholder, goal === g.id && { backgroundColor: colors.text }]}>
                   <MaterialCommunityIcons name={g.icon as any} size={24} color={goal === g.id ? colors.background : colors.textSecondary} />
                </View>
                <View style={styles.optionText}>
                  <Typography variant="body" weight="bold">{g.title}</Typography>
                  <Typography variant="small" color={colors.textSecondary}>{g.desc}</Typography>
                </View>
                <View style={[styles.radio, goal === g.id && styles.radioActive]}>
                  {goal === g.id && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 2 && (
          <View>
            <Typography variant="pageHeading" weight="bold" style={styles.title}>Tell us about yourself</Typography>
            <Typography variant="body" color={colors.textSecondary} style={styles.subtitle}>
              Enter your basic details
            </Typography>

            <View style={styles.inputGroup}>
              <Typography variant="small" weight="bold" style={styles.inputLabel}>Name</Typography>
              <TextInput 
                style={styles.inputField} 
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Typography variant="small" weight="bold" style={styles.inputLabel}>Age</Typography>
              <TextInput 
                style={styles.inputField} 
                placeholder="e.g. 24"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </View>

            <View style={styles.inputGroup}>
              <Typography variant="small" weight="bold" style={styles.inputLabel}>Gender</Typography>
              <View style={styles.rowGrid}>
                <TouchableOpacity 
                  style={[styles.selectBtn, gender === 'Male' && styles.selectBtnActive]} 
                  onPress={() => setGender('Male')}
                >
                  <Typography variant="body" color={gender === 'Male' ? colors.background : colors.text}>Male</Typography>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.selectBtn, gender === 'Female' && styles.selectBtnActive]} 
                  onPress={() => setGender('Female')}
                >
                  <Typography variant="body" color={gender === 'Female' ? colors.background : colors.text}>Female</Typography>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rowGrid}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Typography variant="small" weight="bold" style={styles.inputLabel}>Height (cm)</Typography>
                <TextInput 
                  style={styles.inputField} 
                  placeholder="175"
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Typography variant="small" weight="bold" style={styles.inputLabel}>Weight (kg)</Typography>
                <TextInput 
                  style={styles.inputField} 
                  placeholder="70"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                />
              </View>
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <Typography variant="pageHeading" weight="bold" style={styles.title}>Your Activity Level</Typography>
            <Typography variant="body" color={colors.textSecondary} style={styles.subtitle}>
              How active are you in a typical day?
            </Typography>
            {ACTIVITIES.map((a) => (
              <TouchableOpacity 
                key={a.id}
                style={[styles.optionCard, activity === a.id && styles.optionCardActive]}
                onPress={() => setActivity(a.id)}
              >
                <View style={[styles.optionIconPlaceholder, activity === a.id && { backgroundColor: colors.text }]}>
                   <MaterialCommunityIcons name={a.icon as any} size={24} color={activity === a.id ? colors.background : colors.textSecondary} />
                </View>
                <View style={styles.optionText}>
                  <Typography variant="body" weight="bold">{a.title}</Typography>
                  <Typography variant="small" color={colors.textSecondary}>{a.desc}</Typography>
                </View>
                <View style={[styles.radio, activity === a.id && styles.radioActive]}>
                  {activity === a.id && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 4 && (
          <View>
            <Typography variant="pageHeading" weight="bold" style={styles.title}>Food Preference</Typography>
            <Typography variant="body" color={colors.textSecondary} style={styles.subtitle}>
              Select your dietary preference
            </Typography>
            {PREFERENCES.map((p) => (
              <TouchableOpacity 
                key={p.id}
                style={[styles.optionCard, preference === p.id && styles.optionCardActive]}
                onPress={() => setPreference(p.id)}
              >
                <View style={[styles.optionIconPlaceholder, preference === p.id && { backgroundColor: colors.text }]}>
                   <MaterialCommunityIcons name={p.icon as any} size={24} color={preference === p.id ? colors.background : colors.textSecondary} />
                </View>
                <View style={styles.optionText}>
                  <Typography variant="body" weight="bold">{p.title}</Typography>
                  <Typography variant="small" color={colors.textSecondary}>{p.desc}</Typography>
                </View>
                <View style={[styles.radio, preference === p.id && styles.radioActive]}>
                  {preference === p.id && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 5 && (
          <View style={styles.summaryContainer}>
            <Typography variant="pageHeading" weight="bold" style={styles.title}>Your Health Summary</Typography>
            <Typography variant="body" color={colors.textSecondary} style={styles.subtitle}>
              Here is your complete analysis, {name || 'Harshith'}!
            </Typography>
            
            {(() => {
              const metrics = calculateHealthMetrics();
              return (
                <>
                  <View style={styles.bmiCircleContainer}>
                     <View style={[styles.bmiCircleOuter, metrics.bmiStatus === 'Normal' ? {} : { borderColor: '#D97706' }]}>
                       <Typography variant="small" weight="bold" color={colors.textSecondary}>Your BMI</Typography>
                       <Typography variant="largeHeading" weight="bold" style={{fontSize: 48, marginVertical: 8}}>{metrics.bmi}</Typography>
                       <Typography variant="body" weight="bold">{metrics.bmiStatus}</Typography>
                     </View>
                  </View>

                  <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                      <Typography variant="body" weight="bold">{metrics.bmr}</Typography>
                      <Typography variant="small" color={colors.textSecondary}>BMR kcal</Typography>
                    </View>
                    <View style={styles.statBox}>
                      <Typography variant="body" weight="bold">{metrics.tdee}</Typography>
                      <Typography variant="small" color={colors.textSecondary}>Daily Calories</Typography>
                    </View>
                  </View>

                  <View style={[styles.statsRow, {marginTop: 16}]}>
                     <View style={styles.statBox}><Typography variant="body" weight="bold">{metrics.protein}g</Typography><Typography variant="small" color={colors.textSecondary}>Protein</Typography></View>
                     <View style={styles.statBox}><Typography variant="body" weight="bold">{metrics.carbs}g</Typography><Typography variant="small" color={colors.textSecondary}>Carbs</Typography></View>
                     <View style={styles.statBox}><Typography variant="body" weight="bold">{metrics.fat}g</Typography><Typography variant="small" color={colors.textSecondary}>Fat</Typography></View>
                  </View>
                </>
              );
            })()}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueBtn} onPress={handleNext}>
          <Typography variant="body" weight="bold" color={colors.background}>
            {step === 5 ? 'VIEW PLAN' : 'CONTINUE'}
          </Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  progressDotActive: {
    width: 24,
    backgroundColor: colors.text,
  },
  scrollContent: {
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 8,
    color: colors.textSecondary,
  },
  inputField: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    fontSize: 16,
  },
  rowGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  selectBtn: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  selectBtnActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  optionCardActive: {
    borderColor: colors.text,
    backgroundColor: '#F8F8F8',
  },
  optionIconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: colors.text,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.text,
  },
  summaryContainer: {
    alignItems: 'center',
  },
  bmiCircleContainer: {
    marginVertical: 32,
    alignItems: 'center',
  },
  bmiCircleOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: colors.text,
    borderRightColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  continueBtn: {
    backgroundColor: colors.text,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
