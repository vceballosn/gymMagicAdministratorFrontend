import { Slot } from "expo-router";
import { View } from "react-native";

export type RootStackParamList = {
  Main: undefined;
  Register: undefined;
  AddPaymentScreen: { partnerId: number | string };
  OverduePartnersScreen: undefined; 
};

export default function Layout() {
  return (
    <View className="flex-1 bg-black">
        <Slot/>
    </View>
  );
}