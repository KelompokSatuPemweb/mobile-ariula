import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Login({ navigation }) {
    const [nis, setNis] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = () => {
        if (nis === "0123" && pass === "siswa") {
        navigation.navigate('Dashboard');
        } else {
        Alert.alert("Login Gagal", "Gunakan NIS: 0123 & Password: siswa");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SEBEL MOBILE</Text>
            <Text style={styles.subtitle}>Sekolah Belajar Digital</Text>

            <TextInput 
                style={styles.input}
                placeholder="NIS Siswa"
                value={nis}
                onChangeText={setNis}
                keyboardType="numeric"
            />

            <TextInput 
                style={styles.input}
                placeholder="Password"
                value={pass}
                onChangeText={setPass}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>MASUK</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#2c3e50' },
    subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 40, color: '#7f8c8d' },
    input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
    button: { backgroundColor: '#3498db', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});