import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

import { createPayment } from '../lib/services/paymentsService';

export default function AddPaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [monthPaid, setMonthPaid] = useState('');
  const [partner_id, setPartnerId] = useState('');

  useEffect(() => {
    // 1. Manejar el caso de 'route.params' indefinido
    const params = route.params as { partnerId: number | string } | undefined;
    if (params && params.partnerId) {
      setPartnerId(params.partnerId.toString());
    }
  }, [route.params]);

  const handleSave = async () => {
    // 2. Lógica de validación y creación del objeto 'newPayment'
    if (!amount.trim() || !paymentDate.trim() || !monthPaid.trim() || !partner_id.trim()) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    const newPayment = {
      amount: parseInt(amount),
      paymentDate: paymentDate,
      monthPaid: monthPaid,
      partner_id: parseInt(partner_id),
    };

    try {
      await createPayment(newPayment);
      Alert.alert('Éxito', '¡Pago guardado correctamente!');
      
      // Opcional: limpiar los campos
      setAmount('');
      setPaymentDate('');
      setMonthPaid('');
      setPartnerId('');

      //navigation.navigate('Main');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar el pago. Intenta de nuevo.');
    }
  };

  return (
    <View className="flex-1 p-5 bg-gray-100">
      {/* 3. El botón 'Atras' navega a la pantalla anterior */}
      <View className="absolute top-5 right-5 z-10">
        <Link asChild href='/'>
          <Pressable className="p-3">
            <FontAwesome5 name="home" size={24} color="black" />
          </Pressable>
        </Link>
      </View>


      <Text className="text-2xl font-bold mb-5 text-center text-gray-800">Agregar Nuevo Pago</Text>

      <Text className="text-base mb-1.5 text-gray-700">Monto:</Text>
      <TextInput
        className="h-10 border border-gray-300 rounded-lg p-2.5 mb-4"
        value={amount}
        onChangeText={setAmount}
        placeholder="Escribe el monto"
        keyboardType="numeric"
      />

      <Text className="text-base mb-1.5 text-gray-700">Fecha de Pago:</Text>
      <TextInput
        className="h-10 border border-gray-300 rounded-lg p-2.5 mb-4"
        value={paymentDate}
        onChangeText={setPaymentDate}
        placeholder="Ej: 2025-08-13"
      />
      
      <Text className="text-base mb-1.5 text-gray-700">Mes Pagado:</Text>
      <TextInput
        className="h-10 border border-gray-300 rounded-lg p-2.5 mb-4"
        value={monthPaid}
        onChangeText={setMonthPaid}
        placeholder="Ej: Noviembre"
      />

      <Text className="text-base mb-1.5 text-gray-700">ID del Socio:</Text>
      <TextInput
        className="h-10 border border-gray-300 rounded-lg p-2.5 mb-4"
        value={partner_id}
        onChangeText={setPartnerId}
        placeholder="Escribe el ID del socio"
        keyboardType="numeric"
      />

      <Pressable 
        className="bg-green-600 py-3 rounded-md shadow-lg items-center"
        onPress={handleSave}
      >
        <Text className="text-white text-lg font-semibold">Guardar Pago</Text>
      </Pressable>
    </View>
  );
}