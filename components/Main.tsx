import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

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

  const handlePage = async (id: any) => {
    try {
     console.log("Registrar pago id del Socio"+id)
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo Registrar el Pago. Intenta de nuevo.');
    }
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}>
        {partners.length > 0 ? (
          partners.map(partner => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onDelete={handleDelete}
              onAddpage={handlePage}
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center pt-20">
            <Text className="text-white text-lg font-bold text-center">
              No hay socios registrados.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Botón flotante para agregar socio en la parte inferior */}
      <View className="absolute bottom-6 w-full items-center">
        <Link asChild href='/AddPartnerScreen'>
          <Pressable className="bg-blue-600 rounded-full p-4 shadow-lg">
            <Text className="text-white font-bold text-lg">
              Agregar Nuevo Socio
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}