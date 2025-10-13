// src/app/OverduePartnersScreen.tsx

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { Partner } from '../interfaces/interfacePartner';
import { getOverduePartners } from '../lib/services/partnersService';

// This is the correct import path for PartnerCard
import PartnerCard from '../components/PartnerCard';

export default function OverduePartnersScreen() {
  const [overduePartners, setOverduePartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverduePartners = async () => {
      try {
        const partnersData = await getOverduePartners();
        setOverduePartners(partnersData);
      } catch (error) {
        console.error("Error al cargar socios vencidos:", error);
        Alert.alert('Error', 'No se pudieron cargar los socios vencidos.');
      } finally {
        setLoading(false);
      }
    };
    
    loadOverduePartners();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-600 text-lg">Cargando socios vencidos...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}>
        {/* 3. El botón 'Atras' navega a la pantalla anterior */}
      <View className="absolute top-2 right-5 z-10">
        <Link asChild href='/'>
          <Pressable className="p-3">
            <FontAwesome5 name="home" size={24} color="white" />
          </Pressable>
        </Link>
      </View>
        
        <Text className="text-2xl font-bold mb-5 text-white text-center">Socios Vencidos</Text>

        {overduePartners.length > 0 ? (
          overduePartners.map(partner => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              // Puedes agregar aquí botones para 'eliminar' o 'agregar pago' si lo deseas
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center pt-20">
            <Text className="text-white text-lg font-bold text-center">
              No hay socios con membresía vencida.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}