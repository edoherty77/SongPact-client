import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

const AppFormField = ({
  name,
  width,
  height,
  editable,
  style,
  selectTextOnFocus,
  ...otherProps
}) => {
  const { handleChange, errors, touched } = useFormikContext();

  return (
    <View style={styles.inputContainer}>
      <AppTextInput
        editable={editable}
        selectTextOnFocus={selectTextOnFocus}
        style={[
          style,
          editable === false
            ? { backgroundColor: "#E0E0E0" }
            : { backgroundColor: "white" },
        ]}
        onChangeText={handleChange(name)}
        setFieldValue={name}
        width={width}
        height={height}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default AppFormField;

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    marginBottom: 15,
  },
});
