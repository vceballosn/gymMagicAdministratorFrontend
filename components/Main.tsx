import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Partner } from '../interfaces/interfacePartner';
import { deletePartner, getPartners } from '../lib/services/partnersService';
import PartnerCard from './PartnerCard';

// 1. Define los tipos en un solo lugar. Idealmente, esto iría en un archivo separado
// como 'src/navigation/types.ts' y se importaría aquí.
export type RootStackParamList = {
  Main: undefined;
  Register: undefined;
  AddPaymentScreen: { partnerId: number | string };
  PartnerDetailsScreen : { partnerId: number | string };
  AddPartnerScreen: undefined; // Aseguramos que esta ruta también esté tipada
};

// 2. La prop 'navigation' ya no es necesaria en la firma del componente
// porque usamos el hook 'useNavigation'
export default function Main() {
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList, 'Main'>['navigation']>();
  
  const [partners, setPartners] = useState<Partner[]>([]);

  // 3. Efecto para cargar los socios una vez que el componente se monta
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

  const handlePage = (id: any) => {
    console.log("id del pago "+id);
    // Navegamos con seguridad de tipos a la pantalla de pago, pasando el ID
    navigation.navigate('AddPaymentScreen', { partnerId: id });
  };

  // Ejemplo de navegación desde Main.tsx
const handleViewDetails = (id: any) => {
  navigation.navigate('PartnerDetailsScreen', { partnerId: id });
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
              onAddpage={() => handlePage(partner.id)}
              onAddConsult={() => handleViewDetails(partner.id)}
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
        {/* El Link navega directamente, no necesitamos la función handlePage aquí */}
        <Link asChild href="/AddPartnerScreen">
          <Pressable className="bg-blue-600 rounded-full p-4 shadow-lg">
            <Text className="text-white font-bold text-lg">
              Agregar Nuevo Socio
            </Text>
          </Pressable>
        </Link>
        <Link asChild href="/OverduePartnersScreen">
          <Pressable className="bg-blue-600 rounded-full p-4 shadow-lg">
            <Text className="text-white font-bold text-lg">
              Consultar Socios Vencidos 
            </Text>
          </Pressable>
        </Link>

         <Link asChild href="/DelinquentPartnersScreen">
    <Pressable className="bg-blue-600 rounded-full p-4 shadow-lg">
        <Text className="text-white font-bold text-lg">
            Consultar Socios con Pagos Vencidos
        </Text>
    </Pressable>
</Link>
        
        <Link asChild href="/PartnerDetailsScreen">
        
        </Link>
      </View>
    </View>
  );
}