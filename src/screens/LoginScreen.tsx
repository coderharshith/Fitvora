import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../supabase';
import { Typography } from '../components/Typography';
import { colors } from '../theme/colors';

export const LoginScreen = ({ navigation }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || (!showOtp && !password)) {
      Alert.alert('Error', 'Please enter your details.');
      return;
    }

    setLoading(true);
    let authError = null;

    if (showOtp) {
      // Verify OTP
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      });
      authError = error;
      
      if (!error) {
        Alert.alert('Success', 'Account verified! Let\'s setup your profile.');
        navigation.replace('Onboarding');
        return;
      }
    } else if (isLogin) {
      // Sign In
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      authError = error;
      if (!error) {
        navigation.replace('Onboarding');
        return;
      }
    } else {
      // Sign Up
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (data?.session) {
        Alert.alert('Success', 'Account created! Let\'s setup your profile.');
        navigation.replace('Onboarding');
        return;
      } else if (!error) {
        // Requires email verification (OTP sent)
        Alert.alert('Check Email', 'Please enter the 6-digit code sent to your email.');
        setShowOtp(true);
        setLoading(false);
        return;
      }
      authError = error;
    }

    setLoading(false);

    if (authError) {
      Alert.alert('Authentication Error', authError.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons name="lightning-bolt" size={48} color={colors.background} />
            </View>
            <Typography variant="largeHeading" weight="bold" style={styles.logoText}>FITVORA</Typography>
            <Typography variant="small" color={colors.textSecondary} style={styles.logoSubtext}>
              FUEL YOUR GOALS
            </Typography>
          </View>

          <View style={styles.bottomContainer}>
            <Typography variant="pageHeading" weight="bold" style={styles.welcomeText}>
              {showOtp ? 'Verify Email' : (isLogin ? 'Welcome Back' : 'Create Account')}
            </Typography>
            <Typography variant="body" color={colors.textSecondary} style={styles.welcomeSubtext}>
              {showOtp ? 'Enter the 6-digit code sent to your email.' : (isLogin ? 'Log in to continue your fitness journey.' : 'Sign up to build your custom meal plan.')}
            </Typography>

            <View style={styles.inputWrap}>
               <MaterialCommunityIcons name="email-outline" size={24} color={colors.textSecondary} style={styles.inputIcon} />
               <TextInput 
                 style={styles.input} 
                 placeholder="Email Address" 
                 value={email}
                 onChangeText={setEmail}
                 autoCapitalize="none"
                 keyboardType="email-address"
                 editable={!showOtp}
               />
            </View>

            {!showOtp && (
              <View style={styles.inputWrap}>
                 <MaterialCommunityIcons name="lock-outline" size={24} color={colors.textSecondary} style={styles.inputIcon} />
                 <TextInput 
                   style={styles.input} 
                   placeholder="Password" 
                   value={password}
                   onChangeText={setPassword}
                   secureTextEntry
                 />
              </View>
            )}

            {showOtp && (
              <View style={styles.inputWrap}>
                 <MaterialCommunityIcons name="shield-key-outline" size={24} color={colors.textSecondary} style={styles.inputIcon} />
                 <TextInput 
                   style={styles.input} 
                   placeholder="6-Digit OTP Code" 
                   value={otp}
                   onChangeText={setOtp}
                   keyboardType="number-pad"
                   maxLength={6}
                 />
              </View>
            )}

            <TouchableOpacity 
              style={styles.actionBtn} 
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.background} />
              ) : (
                <Typography variant="body" weight="bold" color={colors.background}>
                  {showOtp ? 'Verify Code' : (isLogin ? 'Sign In' : 'Sign Up')}
                </Typography>
              )}
            </TouchableOpacity>

            {!showOtp && (
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{alignItems: 'center', marginTop: 16}}>
                 <Typography variant="body" color={colors.textSecondary}>
                   {isLogin ? "Don't have an account? " : "Already have an account? "}
                   <Typography variant="body" weight="bold">{isLogin ? 'Sign Up' : 'Log In'}</Typography>
                 </Typography>
              </TouchableOpacity>
            )}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    letterSpacing: 2,
    marginBottom: 8,
  },
  logoSubtext: {
    letterSpacing: 4,
  },
  bottomContainer: {
    paddingBottom: 24,
  },
  welcomeText: {
    marginBottom: 8,
  },
  welcomeSubtext: {
    marginBottom: 32,
    lineHeight: 24,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    backgroundColor: colors.text,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  }
});
