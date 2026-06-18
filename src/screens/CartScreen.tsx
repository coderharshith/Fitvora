import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Typography } from '../components/Typography';
import { colors } from '../theme/colors';

const CART_ITEMS = [
  { id: 1, name: 'Chicken Power Bowl', price: '₹250', qty: 2 },
  { id: 2, name: 'Protein Smoothie', price: '₹180', qty: 1 },
  { id: 3, name: 'Paneer Tikka Bowl', price: '₹220', qty: 1 },
];

export const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Typography variant="pageHeading" weight="bold">Your Cart</Typography>
          <Typography variant="small" color={colors.textSecondary}>3 items</Typography>
        </View>
        <TouchableOpacity>
          <Typography variant="body" weight="bold">Clear Cart</Typography>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {CART_ITEMS.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemImagePlaceholder} />
            <View style={styles.itemDetails}>
              <Typography variant="body" weight="bold" style={styles.itemName}>{item.name}</Typography>
              <Typography variant="body" weight="bold" color={colors.textSecondary}>{item.price}</Typography>
            </View>
            <View style={styles.qtyControl}>
              <TouchableOpacity style={styles.qtyBtn}>
                <Typography variant="body" weight="bold">-</Typography>
              </TouchableOpacity>
              <Typography variant="body" weight="bold" style={styles.qtyText}>{item.qty}</Typography>
              <TouchableOpacity style={styles.qtyBtn}>
                <Typography variant="body" weight="bold">+</Typography>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.deleteBtn}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Typography variant="body" color={colors.textSecondary}>Subtotal</Typography>
            <Typography variant="body" weight="bold">₹900</Typography>
          </View>
          <View style={styles.summaryRow}>
            <Typography variant="body" color={colors.textSecondary}>Delivery</Typography>
            <Typography variant="body" weight="bold">FREE</Typography>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Typography variant="largeHeading" weight="bold">Total</Typography>
            <Typography variant="largeHeading" weight="bold">₹900</Typography>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buyNowBtn}>
          <Typography variant="body" weight="bold" color={colors.background}>BUY NOW</Typography>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    marginBottom: 4,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 16,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    marginHorizontal: 8,
  },
  deleteBtn: {
    padding: 8,
  },
  summaryContainer: {
    marginTop: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FAFAFA',
    paddingBottom: 40,
  },
  buyNowBtn: {
    backgroundColor: colors.text,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
