import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Typography } from '../components/Typography';
import { Card } from '../components/Card';
import { colors } from '../theme/colors';

const POPULAR_MEALS = [
  { id: 1, name: 'Chicken Power Bowl', cals: '650 kcal', protein: '45g Protein', price: '₹250' },
  { id: 2, name: 'Paneer Tikka Bowl', cals: '550 kcal', protein: '30g Protein', price: '₹220' },
  { id: 3, name: 'High Protein Wrap', cals: '520 kcal', protein: '28g Protein', price: '₹200' },
];

const RECOMMENDED_MEALS = [
  { id: 4, name: 'Grilled Chicken Bowl', cals: '500 kcal', protein: '35g Protein', price: '₹230' },
  { id: 5, name: 'Protein Smoothie', cals: '300 kcal', protein: '20g Protein', price: '₹180' },
];

export const MenuScreen = () => {
  const [activeTab, setActiveTab] = useState('All');

  const handleAddToCart = (item: any) => {
    Alert.alert("Success", `${item.name} added to cart!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="pageHeading" weight="bold">Explore Our Menu</Typography>
          <Typography variant="small" color={colors.textSecondary}>Healthy food for your goals</Typography>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
             <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} style={{marginRight: 8}} />
             <Typography variant="body" color={colors.textSecondary}>Search for meals...</Typography>
          </View>
          <TouchableOpacity style={styles.filterBtn}>
             <MaterialCommunityIcons name="tune-variant" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {['All', 'Weight Loss', 'Weight Gain', 'Muscle Gain', 'Maintenance'].map(tab => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => setActiveTab(tab)}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            >
              <Typography 
                variant="small" 
                weight={activeTab === tab ? 'bold' : 'medium'}
                color={activeTab === tab ? colors.background : colors.textSecondary}
              >
                {tab}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Meals */}
        <View style={styles.sectionHeader}>
          <Typography variant="sectionHeading" weight="bold">Popular Meals</Typography>
          <Typography variant="small" weight="medium" color={colors.textSecondary}>See All &gt;</Typography>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularScroll}>
          {POPULAR_MEALS.map(meal => (
            <Card key={meal.id} style={styles.mealCard}>
               <View style={styles.mealImagePlaceholder} />
               <Typography variant="body" weight="bold" style={styles.mealTitle}>{meal.name}</Typography>
               <Typography variant="small" weight="bold" color="#D97706">{meal.cals}</Typography>
               <Typography variant="small" color={colors.textSecondary}>{meal.protein}</Typography>
               <View style={styles.priceRow}>
                 <Typography variant="body" weight="bold">{meal.price}</Typography>
                 <TouchableOpacity style={styles.addBtn} onPress={() => handleAddToCart(meal)}>
                   <Typography variant="body" color={colors.background}>+</Typography>
                 </TouchableOpacity>
               </View>
            </Card>
          ))}
        </ScrollView>

        {/* Recommended For You */}
        <Typography variant="sectionHeading" weight="bold" style={styles.sectionTitle}>Recommended For You</Typography>
        
        {RECOMMENDED_MEALS.map(meal => (
          <Card key={meal.id} style={styles.recommendedCard}>
            <View style={styles.recommendedRow}>
              <View style={styles.recImagePlaceholder} />
              <View style={styles.recInfo}>
                 <Typography variant="body" weight="bold">{meal.name}</Typography>
                 <Typography variant="small" color={colors.textSecondary} style={{marginVertical: 4}}>
                   {meal.cals} • {meal.protein}
                 </Typography>
                 <Typography variant="body" weight="bold">{meal.price}</Typography>
              </View>
              <TouchableOpacity style={styles.addBtn} onPress={() => handleAddToCart(meal)}>
                 <Typography variant="body" color={colors.background}>+</Typography>
              </TouchableOpacity>
            </View>
          </Card>
        ))}

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
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 100, // Space for bottom tab
  },
  header: {
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    height: 50,
    backgroundColor: colors.background,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: colors.background,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryScroll: {
    marginBottom: 24,
  },
  tabBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },
  tabBtnActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  popularScroll: {
    marginBottom: 32,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  mealCard: {
    width: 160,
    marginRight: 16,
    padding: 12,
    borderRadius: 20,
  },
  mealImagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    marginBottom: 12,
  },
  mealTitle: {
    lineHeight: 20,
    marginBottom: 4,
    height: 40,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  recommendedCard: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 20,
  },
  recommendedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginRight: 16,
  },
  recInfo: {
    flex: 1,
  }
});
