import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Paragraph, Card, Divider, ActivityIndicator } from 'react-native-paper';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCredential, FacebookAuthProvider, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseApp } from '../data/firebaseConfig';
import { t } from '../data/i18n';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(firebaseApp);

export default function AuthScreen({ navigation }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '567704618820-2v6v7k1q7k1v7k1v.apps.googleusercontent.com', // Reemplaza por tu clientId de Google
    iosClientId: '567704618820-2v6v7k1q7k1v7k1v.apps.googleusercontent.com', // Reemplaza por tu clientId de Google iOS
    androidClientId: '567704618820-2v6v7k1q7k1v7k1v.apps.googleusercontent.com', // Reemplaza por tu clientId de Google Android
  });
  const [resetSent, setResetSent] = useState(false);

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      setLoading(true);
      signInWithCredential(auth, credential)
        .then(() => navigation.replace('Main'))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [response]);

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigation.replace('Main');
    } catch (e: any) {
      setError(e.message);
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
          <Title style={styles.title}>{isLogin ? t('login') : t('register')}</Title>
          <TextInput
            label={t('email')}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label={t('password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          {error ? <Paragraph style={styles.error}>{error}</Paragraph> : null}
          <Button mode="contained" onPress={handleAuth} style={styles.button} disabled={loading}>
            {isLogin ? t('login') : t('register')}
          </Button>
          {isLogin && (
            <Button mode="text" onPress={handlePasswordReset} style={styles.switchButton} disabled={loading}>
              {t('forgotPassword')}
            </Button>
          )}
          {resetSent && (
            <Paragraph style={{ color: 'green', marginTop: 8, textAlign: 'center' }}>
              Se ha enviado un correo para restablecer tu contraseña.
            </Paragraph>
          )}
          <Button mode="text" onPress={() => setIsLogin(!isLogin)} style={styles.switchButton}>
            {isLogin ? '¿No tienes cuenta? ' + t('register') : '¿Ya tienes cuenta? ' + t('login')}
          </Button>
          <Divider style={styles.divider} />
          <Button
            mode="outlined"
            icon="google"
            onPress={() => promptAsync()}
            style={styles.socialButton}
            disabled={!request || loading}
          >
            Google
          </Button>
          <Button
            mode="outlined"
            icon="facebook"
            onPress={handleFacebookLogin}
            style={styles.socialButton}
            disabled={loading}
          >
            Facebook
          </Button>
          {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
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