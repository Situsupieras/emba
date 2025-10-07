import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Paragraph, Card, Divider } from 'react-native-paper';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../data/firebaseConfig';
import { t } from '../config/i18n';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';

export default function AuthScreen({ navigation }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('25');
  const [currentWeek, setCurrentWeek] = useState('12');
  const [diet, setDiet] = useState('omnívora');
  const [hasBoughtSupplements, setHasBoughtSupplements] = useState(false);
  const [supplements, setSupplements] = useState([]);
  const [previousChildren, setPreviousChildren] = useState('0');

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    
    // Validaciones básicas
    if (!email || !password) {
      setError('Por favor completa todos los campos requeridos');
      setLoading(false);
      return;
    }
    
    if (!isLogin && (!name || !age || !currentWeek)) {
      setError('Por favor completa todos los campos del perfil');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // Guardar datos adicionales en SecureStore
        const userData = {
          name,
          age: Number(age),
          currentWeek: Number(currentWeek),
          diet,
          hasBoughtSupplements,
          supplements,
          previousChildren: Number(previousChildren),
          email,
        };
        console.log('AuthScreen - Guardando perfil de usuario:', userData);
        await SecureStore.setItemAsync('userProfile', JSON.stringify(userData));
        // También guardar la semana en el campo 'semanas' para compatibilidad
        await SecureStore.setItemAsync('semanas', currentWeek);
      }
      navigation.replace('Main');
    } catch (e: any) {
      console.log('Error de autenticación:', e);
      let errorMessage = 'Error de autenticación';
      
      if (e.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo ya está registrado. Intenta iniciar sesión.';
      } else if (e.code === 'auth/weak-password') {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      } else if (e.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido';
      } else if (e.code === 'auth/user-not-found') {
        errorMessage = 'Usuario no encontrado. Verifica tu correo.';
      } else if (e.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta';
      } else if (e.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos. Intenta más tarde.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setError('Funcionalidad de Facebook deshabilitada.');
  };

  const handlePasswordReset = async () => {
    setError('');
    setResetSent(false);
    if (!email) {
      setError('Por favor ingresa tu correo electrónico para restablecer la contraseña.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{isLogin ? t('common.login') : t('common.register')}</Title>
          {!isLogin && (
            <>
              <TextInput
                label={t('common.name')}
                value={name}
                onChangeText={setName}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label={t('profile.age')}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label={t('profile.currentPregnancyWeek')}
                value={currentWeek}
                onChangeText={setCurrentWeek}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <Paragraph style={{ marginTop: 8 }}>{t('profile.dietType')}</Paragraph>
              <Picker
                selectedValue={diet}
                onValueChange={setDiet}
                style={{ marginBottom: 8 }}
              >
                <Picker.Item label={t('diets.omnivorous')} value="omnívora" />
                <Picker.Item label={t('diets.vegetarian')} value="vegetariana" />
                <Picker.Item label={t('diets.vegan')} value="vegana" />
              </Picker>
              <Button
                mode={hasBoughtSupplements ? 'contained' : 'outlined'}
                onPress={() => setHasBoughtSupplements(!hasBoughtSupplements)}
                style={{ marginBottom: 8 }}
              >
                {hasBoughtSupplements ? t('profile.hasBoughtSupplements') : t('profile.hasNotBoughtSupplements')}
              </Button>
              <TextInput
                label={t('profile.previousChildren')}
                value={previousChildren}
                onChangeText={setPreviousChildren}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </>
          )}
          <TextInput
            label={t('common.email')}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label={t('common.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />
          {error ? <Paragraph style={styles.error}>{error}</Paragraph> : null}
          <Button mode="contained" onPress={handleAuth} style={styles.button} disabled={loading}>
            {isLogin ? t('common.login') : t('common.register')}
          </Button>
          {isLogin && (
            <Button mode="text" onPress={handlePasswordReset} style={styles.switchButton} disabled={loading}>
              {t('common.forgotPassword')}
            </Button>
          )}
          {resetSent && (
            <Paragraph style={{ color: 'green', marginTop: 8, textAlign: 'center' }}>
              Se ha enviado un correo para restablecer tu contraseña.
            </Paragraph>
          )}
          <Button mode="text" onPress={() => setIsLogin(!isLogin)} style={styles.switchButton}>
            {isLogin ? '¿No tienes cuenta? ' + t('common.register') : '¿Ya tienes cuenta? ' + t('common.login')}
          </Button>
          {loading && <Paragraph style={{ marginTop: 16, textAlign: 'center' }}>Cargando...</Paragraph>}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f8ff', padding: 16 },
  card: { width: '100%', maxWidth: 400, padding: 24, borderRadius: 16, elevation: 2 },
  title: { marginBottom: 12, textAlign: 'center' },
  input: { marginTop: 8 },
  button: { marginTop: 16 },
  switchButton: { marginTop: 8 },
  divider: { marginVertical: 16 },
  socialButton: { marginTop: 8 },
  error: { color: 'red', marginTop: 8, textAlign: 'center' },
}); 