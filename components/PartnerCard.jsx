import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function PartnerCard({
    partner,
    // Nuevo prop booleano para controlar la visibilidad de los botones
    showActions = true, 
    onDelete = (id) => {},
    onAddpage = (id) => {}, // Renombrado para mayor claridad
    onAddConsult = (id) => {}
}) {
    return (
        <View className="bg-white rounded-xl p-5 my-2.5 shadow-lg w-full self-center">
            <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">{partner.name}</Text>
            
            <View className="flex-row justify-between mb-2.5 border-b border-gray-200 pb-1.5">
                <Text className="text-sm text-gray-600 font-medium">Email:</Text>
                <Text className="text-sm text-gray-800">{partner.email}</Text>
            </View>

            <View className="flex-row justify-between mb-2.5 border-b border-gray-200 pb-1.5">
                <Text className="text-sm text-gray-600 font-medium">Teléfono:</Text>
                <Text className="text-sm text-gray-800">{partner.phone}</Text>
            </View>

            <View className="flex-row justify-between mb-2.5 border-b border-gray-200 pb-1.5">
                <Text className="text-sm text-gray-600 font-medium">Fecha de Registro:</Text>
                <Text className="text-sm text-gray-800">{partner.dateRecord}</Text>
            </View>

            {/* 🔑 Lógica de Comparación: Mostrar el View solo si showActions es true */}
            {showActions && (
                <View className="mt-4 flex-row justify-between">
                    <Pressable
                        className="bg-red-500 rounded p-3 items-center justify-center flex-1 mr-2"
                        onPress={() => onDelete(partner.id)}
                    >
                        <Text className="text-white font-bold">Eliminar</Text>
                    </Pressable>
                    <Pressable
                        className="bg-blue-500 rounded p-3 items-center justify-center flex-1 mx-1" // Usé blue para diferenciar
                        onPress={() => onAddpage(partner.id)}
                    >
                        
                        <Text className="text-white font-bold">Agregar Pago</Text>
                    </Pressable >
                    <Pressable 
                        className="bg-green-500 rounded p-3 items-center justify-center flex-1 ml-2" 
                        onPress={() => onAddConsult(partner.id)}
                    >
                        <Text className="text-white font-bold">Consultar pagos</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}