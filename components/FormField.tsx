import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, TextInputProps } from "react-native";
import tw from "tailwind-react-native-classnames";
import { icons } from "../constants";

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  title, 
  value, 
  placeholder, 
  handleChangeText, 
  otherStyles = "", 
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={tw`mb-4 ${otherStyles}`}>
      <Text style={tw`text-white text-sm font-medium mb-1`}>{title}</Text>

      <View style={tw`flex-row items-center bg-gray-900 rounded-xl border border-gray-700 px-4 h-12`}>
        <TextInput
          style={tw`flex-1 text-white text-base`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
 
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={tw`p-2`}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={tw`w-5 h-5`} 
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
