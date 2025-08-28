
import React, { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { deletePartner, getPartners } from "../lib/services/partnersService"; // <-- Importa la nueva función
import PartnerCard from './PartnerCard';

export default function Main() {
  const [partners, setPartners] = React.useState([]);

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

  // Nueva función para eliminar un socio
  const handleDelete = async (id) => {
    console.log("handleDelete se está ejecutando para el ID:", id); // <-- Agrega esta línea
    try {
      await deletePartner(id); // Llama al servicio para eliminar de la API
      
      // Actualiza el estado para eliminar la tarjeta de la lista
      setPartners(partners.filter(p => p.id !== id));
      Alert.alert('Éxito', 'Socio eliminado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el socio. Intenta de nuevo.');
      console.error(error);
    }
  };

  return (
  <View style={styles.container}>
    
   <ScrollView>
  {partners.map((partner) => {
    // This console.log will tell you exactly what's being passed
    console.log("Partner data:", partner);
    
    // Only render the card if the partner has a valid ID
    return partner.id && (
      <PartnerCard 
        key={partner.id} 
        partner={partner}
        onDelete={handleDelete}
      />
    );
  })}
</ScrollView>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});