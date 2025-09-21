// src/lib/services/paymentsService.ts

// Asegúrate de reemplazar esta URL con la dirección de tu API
const API_URL = 'http://localhost:9010/api/v1/Payments'; 

/**
 * Crea un nuevo pago en la base de datos a través de la API.
 * @param paymentData Los datos del pago a enviar.
 */
export const createPayment = async (paymentData: {
  amount: number;
  paymentDate: string;
  monthPaid: string;
  partner_id: number;
}) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    // Manejar errores de respuesta HTTP (ej. 400, 500)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear el pago: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Pago creado exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error en createPayment:', error);
    throw error;
  }
};