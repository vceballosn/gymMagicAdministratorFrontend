import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, Button, ScrollView, View } from 'react-native';
import PartnerCard from '../components/PartnerCard';
import { Partner } from '../interfaces/interfacePartner';
import { deletePartner, getPartners } from '../lib/services/partnersService';

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

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <ScrollView>
        {partners.map(partner => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onDelete={handleDelete}
          />
        ))}
      </ScrollView>
      
      <Button
        title="Ir a Registrar"
        onPress={() => navigation.navigate('Register')}
      />
      
      
     
    </View>
  );
}

// Se ha eliminado la constante de estilos al final del archivo.