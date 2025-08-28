import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PartnerCard({ partner, onDelete = (id) => {} }) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{partner.name}</Text>
            
            <View style={styles.infoGroup}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{partner.email}</Text>
            </View>

            <View style={styles.infoGroup}>
                <Text style={styles.label}>Teléfono:</Text>
                <Text style={styles.value}>{partner.phone}</Text>
            </View>

            <View style={styles.infoGroup}>
                <Text style={styles.label}>Fecha de Registro:</Text>
                <Text style={styles.value}>{partner.dateRecord}</Text>
            </View>

            <View style={styles.deleteButtonContainer}>
                <Pressable
                    style={styles.pressableButton}
                    onPress={() => {
                        console.log('¡Pressable activado!' + partner.id);
                        onDelete(partner.id); // <-- ¡Así es como se llama correctamente!
                    }}
                >
                    <Text style={styles.buttonText}>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        alignSelf: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    infoGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    label: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    value: {
        fontSize: 14,
        color: '#333',
    },
    deleteButtonContainer: {
        marginTop: 15,
    },
    pressableButton: {
        backgroundColor: '#ff5c5c',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});