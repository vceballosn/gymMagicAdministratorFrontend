import { PartnerDetails } from '../../interfaces/interfacePartnerDetails';

const API_URL = 'http://localhost:9010/api/v1/partners';
const API_BASE_URL = 'http://localhost:9010/api/v1';

// LEER: Obtener todos los partners
export const getPartners = async () => {
  try {
    const response = await fetch(API_URL);
    const partners = await response.json();
    return partners;
  } catch (error) {
    console.error('Error al obtener partners:', error);
    return []; // Devolver un array vacío en caso de error
  }
};

// CREAR: Agregar un nuevo partner
export const createPartner = async (newPartnerData:any) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPartnerData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al crear partner:', error);
  }
};

// ACTUALIZAR: Modificar un partner existente
export const updatePartner = async (partnerId: number, updatedData:any) => {
  try {
    const response = await fetch(`${API_URL}/${partnerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al actualizar partner:', error);
  }
};

// ELIMINAR: Borrar un partner
export const deletePartner = async (partnerId: number) => {
  try {
    console.log("esta entrando deletePartner ")
            await fetch(`${API_URL}/${partnerId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error al eliminar partner:', error);
  }
};

// Nueva función para obtener socios vencidos
export const getOverduePartners = async () => {
  try {
    const allPartners = await getPartners(); // Reutiliza tu función existente
    const today = new Date();
    
    // Filtra los socios cuya fecha de registro sea anterior a un mes atrás
    // y asume que la fecha de registro marca el inicio de la membresía.
    const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));

    const overdue = allPartners.filter((partner: { dateRecord: string | number | Date; }) => {
      const dateRecord = new Date(partner.dateRecord);
      return dateRecord < oneMonthAgo;
    });

    return overdue;
  } catch (error) {
    console.error('Error en getOverduePartners:', error);
    throw error;
  }
};

export const getPartnerDetails = async (partnerId: number): Promise<PartnerDetails> => {
  const url = `${API_BASE_URL}/partners/${partnerId}/with-payments`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al cargar los detalles del socio: ${response.status} - ${errorData.error}`);
    }

    const data: PartnerDetails = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
