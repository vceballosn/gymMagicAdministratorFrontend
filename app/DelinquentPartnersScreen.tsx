// app/DelinquentPartnersScreen.tsx

import { useNavigation, useRoute } from '@react-navigation/native';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { Partner } from '../interfaces/interfacePartner';
import { getDelinquentPartners } from '../lib/services/partnersService';

import PartnerCard from '../components/PartnerCard';

export default function DelinquentPartnersScreen() {

    const navigation = useNavigation();
    const route = useRoute();

  const [delinquentPartners, setDelinquentPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // Usamos useFocusEffect para recargar la lista cada vez que se entra a la pantalla
  const loadDelinquentPartners = useCallback(async () => {
    setLoading(true);
    try {
      const partnersData = await getDelinquentPartners();
      setDelinquentPartners(partnersData);
    } catch (error) {
      console.error("Error al cargar socios pendientes:", error);
      Alert.alert('Error', 'No se pudieron cargar los socios con pagos pendientes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDelinquentPartners();
      return () => {};
    }, [loadDelinquentPartners])
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#FFD700" />
        <Text className="text-white mt-2">Buscando socios pendientes...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}>
        
        {/* Botón de Atrás */}
        <Link asChild href="/">
          <Pressable className="mt-6 mb-5 self-start">
            <Text className="text-blue-500 font-bold text-lg">
              ← Atrás
            </Text>
          </Pressable>
        </Link>
        
        <Text className="text-3xl font-bold mb-6 text-yellow-500 text-center">
          Pagos Pendientes ⚠️
        </Text>

        {delinquentPartners.length > 0 ? (
          delinquentPartners.map(partner => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              showActions={false}
              // Si tienes navegación a detalles o añadir pago, añádela aquí
            />
          ))
        ) : (
          <View className="flex-1 items-center justify-center pt-20">
            <Text className="text-white text-lg font-bold text-center">
              ✅ ¡Todos al día!
            </Text>
            <Text className="text-gray-400 text-sm mt-2 text-center">
              No se encontraron socios con pagos pendientes.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}