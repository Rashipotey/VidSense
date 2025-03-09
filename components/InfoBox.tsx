import { View, Text, ViewStyle, TextStyle, StyleProp } from "react-native";

interface InfoBoxProps {
  title: string;
  subtitle: string;
  titleStyles?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle> | null;
}

const InfoBox: React.FC<InfoBoxProps> = ({ 
  title, 
  subtitle, 
  containerStyles, 
  titleStyles 
}) => {
  return (
    <View style={containerStyles}>
      <Text style={[{ color: "white", textAlign: "center", fontWeight: "600" }, titleStyles]}>
        {title}
      </Text>
      <Text style={{ fontSize: 14, color: "#D1D5DB", textAlign: "center" }}>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
