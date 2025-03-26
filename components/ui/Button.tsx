import { Pressable, StyleSheet, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({ 
  children, 
  variant = 'primary', 
  disabled = false,
  style,
  ...props 
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: disabled 
            ? colors.tint + '40'  // Using tint color with 40% opacity for disabled state
            : variant === 'primary' 
              ? colors.tint 
              : colors.background,
          borderColor: colors.tint,
        },
        style
      ]}
      disabled={disabled}
      {...props}>
      <ThemedText
        style={[
          styles.text,
          {
            color: variant === 'primary' ? colors.background : colors.text,
            opacity: disabled ? 0.5 : 1,
          },
        ]}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 120,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 