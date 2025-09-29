// app/PartnerDetailsScreen.tsx

import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { PartnerDetails } from '../interfaces/interfacePartnerDetails';
import { Payment } from '../interfaces/interfacePayment';
import { getPartnerDetails } from '../lib/services/partnersService';

// Tipos para asegurar que se pase el 'partnerId'
type PartnerDetailsRouteParams = {
  partnerId: number;
};

export default function PartnerDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { partnerId } = route.params as PartnerDetailsRouteParams;

  const [partner, setPartner] = useState<PartnerDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        // Usamos el partnerId pasado por la navegación
        const data = await getPartnerDetails(partnerId);
        setPartner(data);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los datos del socio.');
      } finally {
        setLoading(false);
      }
    };
    
    // Solo cargamos si tenemos un ID válido
    if (partnerId) {
      loadDetails();
    }
  }, [partnerId]);


  // Componente de Tarjeta de Pago
  const PaymentCard = ({ payment }: { payment: Payment }) => (
    <View className="bg-white p-4 rounded-lg mb-3 shadow-md border border-gray-200">
      <Text className="text-sm text-gray-500 mb-1">Pago #{payment.id}</Text>
      <Text className="text-xl font-bold text-green-600 mb-1">${payment.amount.toFixed(2)}</Text>
      <View className="flex-row justify-between">
        <Text className="text-base text-gray-700">Mes: {payment.monthPaid}</Text>
        <Text className="text-base text-gray-700">Fecha: {payment.paymentDate}</Text>
      </View>
    </View>
  );

  // Renderizado Condicional
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="text-white mt-2">Cargando detalles...</Text>
      </View>
    );
  }

  if (!partner) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">Socio no encontrado.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80, paddingTop: 30 }}>
        
        {/* Botón de Atrás */}
        <Pressable onPress={() => navigation.goBack()} className="mb-6 self-start">
          <Text className="text-blue-500 font-bold text-lg">
            ← Atrás
          </Text>
        </Pressable>

        {/* --- Detalles del Socio --- */}
        <Text className="text-3xl font-bold text-white mb-2">{partner.name}</Text>
        <Text className="text-gray-400 text-lg mb-5">ID: {partner.id}</Text>
        
        <View className="bg-gray-800 p-4 rounded-lg mb-6">
            <Text className="text-gray-300 text-base">📧 {partner.email}</Text>
            <Text className="text-gray-300 text-base mt-1">🗓️ Registro: {partner.dateRecord}</Text>
        </View>

        {/* --- Pagos Realizados --- */}
        <Text className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
            Historial de Pagos
        </Text>

        {partner.payments.length > 0 ? (
          partner.payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        ) : (
          <View className="bg-gray-800 p-4 rounded-lg items-center">
            <Text className="text-gray-400 font-semibold">Aún no hay pagos registrados para este socio.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}