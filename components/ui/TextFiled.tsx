import * as React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  icon?: string;
  label: string;
  mode?: "outlined" | "flat";
  disabled?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  style?: ViewStyle;
  isPassword?: boolean;
  error?: boolean;
  helperText?: string | false;
}

export const TextFiled: React.FC<Props> = ({
  icon,
  label,
  mode = "outlined",
  value,
  onChangeText,
  onBlur,
  placeholder,
  style,
  isPassword = false,
  error = false,
  helperText = "",
}) => {
  const [hidePassword, setHidePassword] = React.useState(isPassword);

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      placeholder={placeholder}
      mode={mode}
      style={[styles.textInput, style]}
      secureTextEntry={isPassword ? hidePassword : false}
      left={icon ? <TextInput.Icon icon={icon} /> : undefined}
      right={
        isPassword ? (
          <TextInput.Icon
            icon={hidePassword ? "eye-off" : "eye"}
            onPress={() => setHidePassword(!hidePassword)}
          />
        ) : undefined
      }
      error={error}
      theme={{
        colors: {
          primary: "#4F46BA",
          placeholder: "#777777",
          background: "#ffffff",
          outline: "#cccccc",
          error: "#ff4d4f",
        },
        // Removed invalid fonts property
      }}
      contentStyle={{
        fontSize: 18,
        height: 60,
        color: "#000",
      }}
      helperText={error ? helperText : undefined}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },
});
