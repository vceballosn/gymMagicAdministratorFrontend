import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Link } from 'expo-router'; // Correct import for navigation
import React, { useEffect } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { Partner } from '../interfaces/interfacePartner';
import { deletePartner, getPartners } from '../lib/services/partnersService';
import PartnerCard from './PartnerCard';



// Define tus rutas para la seguridad de tipos
type RootStackParamList = {
  Main: undefined;
  Register: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function Main({ navigation }: Props) {
  const [partners, setPartners] = React.useState<Partner[]>([]);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const partnersData = await getPartners();
        setPartners(partnersData);
      } catch (error) {
        console.error("Error al cargar partners:", error);
      }
    };
    
    loadPartners();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      await deletePartner(id);
      setPartners(partners.filter(p => p.id !== id));
      Alert.alert('Éxito', 'Socio eliminado correctamente.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo eliminar el socio. Intenta de nuevo.');
    }
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        {partners.map(partner => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onDelete={handleDelete}
          />
        ))}
      </ScrollView>

      <Link asChild href='/AddPartnerScreen'>
        <Pressable>
          <FontAwesome6 name="save" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}