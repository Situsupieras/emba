import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Paragraph, Card, Dialog, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SecureStore from 'expo-secure-store';
import { t } from '../data/i18n';

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
  const [error, setError] = useState('');

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
    await SecureStore.deleteItemAsync('fechaReferenciaSemana');
    await SecureStore.deleteItemAsync('semanas');
    navigation.replace('Main');
  };

  const handleCustomWeeks = async () => {
    const semanasNum = parseInt(customWeeks, 10);
    if (isNaN(semanasNum) || semanasNum < 1 || semanasNum > 40) {
      setError('Por favor ingresa un número de semanas válido (1-40).');
      return;
    }
    setError('');
    setSemanas(semanasNum);
    await SecureStore.setItemAsync('semanas', semanasNum.toString());
    await SecureStore.setItemAsync('fechaReferenciaSemana', new Date().toISOString());
    await SecureStore.deleteItemAsync('ultimaRegla');
    setConfirmDialog(false);
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{t('lastMenstruationDate')}</Title>
          <Paragraph>{t('thisAllowsUsToCalculateYourPregnancyWeek')}</Paragraph>
          <Button mode="outlined" onPress={() => setShowPicker(true)} style={styles.button}>
            {t('selectDate')}
          </Button>
          <Paragraph style={styles.selectedDate}>{t('selectedDate')}: {date.toLocaleDateString()}</Paragraph>
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
          <Dialog.Title>{t('confirmPregnancyWeek')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {t('accordingToTheDateEnteredYouHave')} <Title>{semanas}</Title> {t('pregnancyWeeks')}
            </Paragraph>
            <Button mode="contained" onPress={handleConfirm} style={styles.button}>
              {t('confirm')}
            </Button>
            <Paragraph style={{ marginTop: 16 }}>{t('ifNotCorrectYouCanModifyItManually')}:</Paragraph>
            <TextInput
              label={t('pregnancyWeek')}
              value={customWeeks}
              onChangeText={setCustomWeeks}
              keyboardType="numeric"
              style={styles.input}
              error={!!error}
            />
            {error ? (
              <Paragraph style={{ color: 'red', marginTop: 4, textAlign: 'center' }}>{error}</Paragraph>
            ) : null}
            <Button mode="outlined" onPress={handleCustomWeeks} style={styles.button}>
              {t('customWeeks')}
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f8ff', padding: 16 },
  card: { width: '100%', maxWidth: 400, padding: 24, borderRadius: 16, elevation: 2 },
  title: { marginBottom: 12, textAlign: 'center' },
  button: { marginTop: 12 },
  selectedDate: { marginTop: 8, textAlign: 'center' },
  input: { marginTop: 8 },
}); 