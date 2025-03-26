import { TextInput as RNTextInput, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export function TextInput(props: TextInputProps) {
  const { colors } = useTheme();
  
  return (
    <RNTextInput 
      style={[styles.input, { borderColor: colors.border, color: colors.text }]} 
      placeholderTextColor={colors.text} 
      {...props} 
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
}); 