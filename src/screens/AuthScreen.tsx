import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Paragraph, Card } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

export default function AuthScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setError('');
    setInfo('');
    if (!name) {
      setError('Por favor ingresa tu nombre');
      return;
    }
    setLoading(true);
    setInfo('Guardando datos...');
    try {
      console.log('Intentando guardar userName:', name, 'userEmail:', email);
      await SecureStore.setItemAsync('userName', name);
      if (email) await SecureStore.setItemAsync('userEmail', email);
      setInfo('Datos guardados. Navegando a UltimaRegla...');
      navigation.replace('UltimaRegla');
    } catch (e) {
      setError('Error guardando datos: ' + String(e));
      console.log('Error en SecureStore:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Bienvenida a Mi Embarazo</Title>
          <Paragraph>Para comenzar, ingresa tu nombre y (opcional) tu email.</Paragraph>
          <TextInput
            label="Nombre"
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoFocus
          />
          <TextInput
            label="Email (opcional)"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          {error ? <Paragraph style={styles.error}>{error}</Paragraph> : null}
          {info ? <Paragraph style={{ color: 'blue', marginBottom: 8, textAlign: 'center' }}>{info}</Paragraph> : null}
          <Button mode="contained" onPress={handleContinue} style={styles.button} loading={loading} disabled={loading}>
            Continuar
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f8ff' },
  card: { width: '90%', padding: 16 },
  title: { marginBottom: 12, textAlign: 'center' },
  input: { marginBottom: 12 },
  button: { marginTop: 8 },
  error: { color: 'red', marginBottom: 8, textAlign: 'center' },
}); 