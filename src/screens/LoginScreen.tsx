import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
// import { auth } from '../firebase';
import { Typography } from '../components/Typography';
import { colors } from '../theme/colors';

// Configure Google Sign-in (COMMENTED OUT FOR MVP)
// In a real app, replace the webClientId with your actual client ID from Google Cloud Console.
// GoogleSignin.configure({
//   webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
// });

export const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = () => {
    setLoading(true);
    // Simulate a network request for the MVP
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Onboarding');
    }, 1000);
  };

  /* 
  // FUTURE GOOGLE AUTH LOGIC:
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;
      if (!idToken) throw new Error('No ID token found');
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      navigation.replace('Onboarding');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Error', error.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };
  */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
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
            Welcome
          </Typography>
          <Typography variant="body" color={colors.textSecondary} style={styles.welcomeSubtext}>
            Log in to continue your fitness journey and track your meals.
          </Typography>

          <TouchableOpacity 
            style={styles.googleBtn} 
            onPress={handleGuestLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <>
                <MaterialCommunityIcons name="google" size={24} color={colors.background} />
                <Typography variant="body" weight="bold" color={colors.background} style={styles.googleBtnText}>
                  Sign in with Google
                </Typography>
              </>
            )}
          </TouchableOpacity>

          <Typography variant="small" color={colors.textSecondary} style={styles.termsText} align="center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </View>

      </View>
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
    paddingBottom: 40,
  },
  welcomeText: {
    marginBottom: 8,
  },
  welcomeSubtext: {
    marginBottom: 32,
    lineHeight: 24,
  },
  googleBtn: {
    flexDirection: 'row',
    backgroundColor: colors.text,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  googleBtnText: {
    marginLeft: 12,
  },
  termsText: {
    lineHeight: 20,
    paddingHorizontal: 20,
  }
});
