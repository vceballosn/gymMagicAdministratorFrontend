import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Pressable, Text, TextInput, View } from 'react-native';
import { createPartner } from '../lib/services/partnersService';

export default function AddPartnerScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    const newPartner = {
      name: name,
      email: email,
      phone: phone,
      dateRecord: new Date().toISOString()
    };

    try {
      await createPartner(newPartner);
      Alert.alert('Éxito', '¡Socio guardado correctamente!');
      
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el socio. Intenta de nuevo.');
      console.error(error);
    }
  };

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <Link asChild href='/'>
        <Pressable className="text-blue-400 text-xl font-bold mb-5">
           <FontAwesome5 name="home" size={24} color="black" />
        </Pressable>
      </Link>

      <Text className="text-2xl font-bold mb-5 text-center text-gray-800">Agregar Nuevo Socio</Text>

      <Text className="text-base mb-1.5 text-gray-700">Nombre:</Text>
      <TextInput
        className="h-10 border border-gray-300 rounded-lg p-2.5 mb-4"
        value={name}
        onChangeText={setName}
        placeholder="Escribe el nombre del socio"
      />

      <Text className="text-base mb-1.5 text-gray-700">Correo electrónico:</Text>
      <TextInput
        className="h-10 border border-gray-300 rounded-lg p-2.5 mb-4"
        value={email}
        onChangeText={setEmail}
        placeholder="Escribe el email del socio"
        keyboardType="email-address"
      />
      
      <Text className="text-base mb-1.5 text-gray-700">Teléfono:</Text>
      <TextInput
        className="h-10 border border-gray-300 rounded-lg p-2.5 mb-4"
        value={phone}
        onChangeText={setPhone}
        placeholder="Escribe el teléfono"
        keyboardType="phone-pad"
      />

      <Button
        title="Guardar Socio"
        onPress={handleSave}
      />
    </View>
  );
}