import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tabungan({ keDashboard }) {
    const [nama, setNama] = useState('');
    const [nominal, setNominal] = useState('');
    const [dataTabungan, setDataTabungan] = useState([]);

    const hapusData = (id) => {
        Alert.alert("Hapus Tabungan", "Yakin ingin menghapus data tabungan ini?", [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", style: "destructive", onPress: async () => {
            const sisaData = dataTabungan.filter(item => item.id !== id);
            await AsyncStorage.setItem('db_tabungan', JSON.stringify(sisaData));
            setDataTabungan(sisaData);
        }}
        ]);
    };

    useEffect(() => {
        muatData();
    }, []);

    const muatData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('db_tabungan');
        if (jsonValue != null) setDataTabungan(JSON.parse(jsonValue));
        } catch (e) { console.error(e) }
    };

    const simpanData = async () => {
        if (!nama || !nominal) return Alert.alert("Error", "Isi semua field!");
        
        const baru = { 
            id: Date.now().toString(), 
            nama: nama, 
            nominal: parseInt(nominal),
            tanggal: new Date().toLocaleDateString(), 
            status: "Berhasil" 
        };
    }

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={keDashboard} style={styles.backBtn}>
            <Text>⬅ Kembali</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Input Tabungan</Text>
        
        <View style={styles.form}>
            <TextInput placeholder="Nama Siswa" style={styles.input} value={nama} onChangeText={setNama} />
            <TextInput placeholder="Nominal (Rp)" style={styles.input} value={nominal} onChangeText={setNominal} keyboardType="numeric" />
            <TouchableOpacity style={styles.btnSimpan} onPress={simpanData}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Simpan</Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={dataTabungan}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.item}>
                <View>
                <Text style={{fontWeight: 'bold'}}>{item.nama}</Text>
                <Text>Rp {parseInt(item.total).toLocaleString()}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.badge}>{item.status}</Text>
                <TouchableOpacity onPress={() => hapusData(item.id)} style={{marginLeft: 15}}>
                    <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>×</Text>
                </TouchableOpacity>
                </View>
            </View>
            )}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 50 },
    backBtn: { marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    form: { marginBottom: 30 },
    input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 8 },
    btnSimpan: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 5 },
    item: { padding: 15, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    badge: { backgroundColor: '#dff9fb', padding: 5, borderRadius: 5, fontSize: 10, color: '#3498db' }
});