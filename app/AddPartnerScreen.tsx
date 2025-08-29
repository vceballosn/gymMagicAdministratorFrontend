import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createPartner } from '../lib/services/partnersService'; // Asegúrate de que la ruta sea correcta

export default function AddPartnerScreen() {
  // Estado para cada campo del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = async () => {
    // Validar que los campos no estén vacíos
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    const newPartner = {
      name: name,
      email: email,
      phone: phone,
      // La fecha se puede agregar automáticamente en el servidor,
      // pero si es necesaria, la puedes agregar aquí.
      // dateRecord: new Date().toISOString() 
    };

    try {
      // Llamar a la función del servicio para crear el registro en la API
      await createPartner(newPartner);
      Alert.alert('Éxito', '¡Socio guardado correctamente!');
      
      // Limpiar los campos del formulario después de guardar
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el socio. Intenta de nuevo.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Socio</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Escribe el nombre del socio"
      />

      <Text style={styles.label}>Correo electrónico:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Escribe el email del socio"
        keyboardType="email-address"
      />
      
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});