import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/login';
import Dashboard from './src/screens/Dashboard';
import Tabungan from './src/screens/Tabungan';
import NilaiSiswa from './src/screens/NilaiSiswa';
import JadwalMengajar from './src/screens/JadwalMengajar';

export default function App() {
  const [halaman, setHalaman] = useState('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cekStatusLogin();
  }, []);

  const cekStatusLogin = async () => {
    try {
      const status = await AsyncStorage.getItem('isLoggedIn');
      if (status === 'true') {
        setHalaman('dashboard');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setHalaman('dashboard');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    setHalaman('login');
  };

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {halaman === 'login' && (
        <Login keDashboard={handleLoginSuccess} />
      )}
      
      {halaman === 'dashboard' && (
        <Dashboard 
          navigasi={(tujuan) => setHalaman(tujuan)} 
          keLogin={handleLogout} 
        />
      )}

      {halaman === 'tabungan' && (
        <Tabungan keDashboard={() => setHalaman('dashboard')} />
      )}

      {halaman === 'nilai' && (
        <NilaiSiswa keDashboard={() => setHalaman('dashboard')} />
      )}

      {halaman === 'jadwal' && (
        <JadwalMengajar keDashboard={() => setHalaman('dashboard')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});