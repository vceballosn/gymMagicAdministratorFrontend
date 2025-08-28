const API_URL = 'http://localhost:9010/api/v1/partners';

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
export const createPartner = async (newPartnerData) => {
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
export const updatePartner = async (partnerId, updatedData) => {
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
export const deletePartner = async (partnerId) => {
  try {
    console.log("esta entrando deletePartner ")
            await fetch(`${API_URL}/${partnerId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error al eliminar partner:', error);
  }
};