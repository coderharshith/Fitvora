import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface TypographyProps extends TextProps {
  variant?: 'largeHeading' | 'pageHeading' | 'sectionHeading' | 'body' | 'small';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  weight = 'regular',
  color = colors.text,
  align = 'left',
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        {
          fontSize: typography.size[variant],
          fontWeight: weight === 'regular' ? '400' : weight === 'medium' ? '500' : weight === 'semiBold' ? '600' : '700',
          color,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
