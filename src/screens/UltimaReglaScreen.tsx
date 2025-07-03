import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Paragraph, Card, Dialog, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SecureStore from 'expo-secure-store';

function calcularSemanas(ultimaRegla: Date) {
  const hoy = new Date();
  const diff = hoy.getTime() - ultimaRegla.getTime();
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  return Math.floor(dias / 7);
}

export default function UltimaReglaScreen({ navigation }: any) {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [semanas, setSemanas] = useState<number | null>(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [customWeeks, setCustomWeeks] = useState('');

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setSemanas(calcularSemanas(selectedDate));
      setConfirmDialog(true);
    }
  };

  const handleConfirm = async () => {
    await SecureStore.setItemAsync('ultimaRegla', date.toISOString());
    await SecureStore.setItemAsync('semanas', semanas?.toString() || '');
    navigation.replace('Main');
  };

  const handleCustomWeeks = async () => {
    const semanasNum = parseInt(customWeeks, 10);
    if (!isNaN(semanasNum)) {
      setSemanas(semanasNum);
      await SecureStore.setItemAsync('ultimaRegla', date.toISOString());
      await SecureStore.setItemAsync('semanas', semanasNum.toString());
      setConfirmDialog(false);
      navigation.replace('Main');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Fecha de tu última menstruación</Title>
          <Paragraph>Esto nos permite calcular tu semana de embarazo.</Paragraph>
          <Button mode="outlined" onPress={() => setShowPicker(true)} style={styles.button}>
            Seleccionar fecha
          </Button>
          <Paragraph style={styles.selectedDate}>Seleccionada: {date.toLocaleDateString()}</Paragraph>
        </Card.Content>
      </Card>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
      <Portal>
        <Dialog visible={confirmDialog} onDismiss={() => setConfirmDialog(false)}>
          <Dialog.Title>Confirmar semana</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Según la fecha ingresada, tienes <Title>{semanas}</Title> semanas de embarazo. ¿Es correcto?
            </Paragraph>
            <Button mode="contained" onPress={handleConfirm} style={styles.button}>
              Sí, es correcto
            </Button>
            <Paragraph style={{ marginTop: 16 }}>Si no es correcto, puedes modificarlo manualmente:</Paragraph>
            <TextInput
              label="Semana de embarazo"
              value={customWeeks}
              onChangeText={setCustomWeeks}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button mode="outlined" onPress={handleCustomWeeks} style={styles.button}>
              Guardar semana personalizada
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f8ff' },
  card: { width: '90%', padding: 16 },
  title: { marginBottom: 12, textAlign: 'center' },
  button: { marginTop: 12 },
  selectedDate: { marginTop: 8, textAlign: 'center' },
  input: { marginTop: 8 },
}); 