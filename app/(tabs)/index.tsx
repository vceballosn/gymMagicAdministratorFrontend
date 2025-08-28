

import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import PartnerCard from '../../components/PartnerCard';
import { Partner } from '../../interfaces/interfacePartner';
import { deletePartner, getPartners } from '../../lib/services/partnersService.js';

export default function Main() {
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
      await deletePartner(id); // Llama al servicio de eliminación
      
      // Filtra la lista para eliminar el socio
      setPartners(partners.filter(p => p.id !== id));
      Alert.alert('Éxito', 'Socio eliminado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el socio. Intenta de nuevo.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" /> 
      <ScrollView>
        {partners.map(partner => (
          <PartnerCard 
            key={partner.id} 
            partner={partner}
            onDelete={handleDelete} // <-- ¡Añade esta línea!
          />
        ))}
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