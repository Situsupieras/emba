import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Button, Avatar, TextInput, ActivityIndicator } from 'react-native-paper';
import { getAuth, signOut, updateProfile, sendEmailVerification } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
// @ts-ignore
import I18n from 'i18n-js';
import { t } from '../data/i18n';

export default function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [verifMsg, setVerifMsg] = useState('');
  const initialLocale = typeof I18n.locale === 'string' ? I18n.locale : 'es';
  const [language, setLanguage] = useState(
    typeof initialLocale === 'string' && initialLocale.startsWith('es') ? 'es' : 'en'
  );

  // Si user es undefined, mostrar loader
  if (typeof user === 'undefined') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f8ff' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // Si user es null, mostrar mensaje
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f8ff' }}>
        <Paragraph style={{ color: 'red', fontSize: 16 }}>No hay usuario autenticado.</Paragraph>
      </View>
    );
  }

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handlePickImage = async () => {
    setError('');
    setSuccess('');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoURL(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await updateProfile(user!, {
        displayName,
        photoURL: photoURL || undefined,
      });
      setSuccess('Perfil actualizado correctamente.');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendVerification = async () => {
    setVerifMsg('');
    setError('');
    try {
      await sendEmailVerification(user!);
      setVerifMsg('Correo de verificación enviado. Revisa tu bandeja de entrada.');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    // @ts-ignore
    I18n.locale = lang;
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <TouchableOpacity onPress={handlePickImage}>
              {photoURL ? (
                <Image source={{ uri: photoURL }} style={styles.avatarImg} />
              ) : (
                <Avatar.Text size={60} label={displayName ? displayName.charAt(0) : user?.email?.charAt(0) || '?'} />
              )}
            </TouchableOpacity>
            <View style={styles.info}>
              <TextInput
                label={t('name')}
                value={displayName}
                onChangeText={setDisplayName}
                style={styles.input}
              />
              <Paragraph style={styles.email}>{user?.email}</Paragraph>
              <View style={styles.languageRow}>
                <Paragraph style={styles.languageLabel}>{t('language')}:</Paragraph>
                <Button mode={language === 'es' ? 'contained' : 'outlined'} onPress={() => handleChangeLanguage('es')} style={styles.langButton}>Español</Button>
                <Button mode={language === 'en' ? 'contained' : 'outlined'} onPress={() => handleChangeLanguage('en')} style={styles.langButton}>English</Button>
                <Paragraph style={styles.languageSelected}>{language === 'es' ? t('spanish') : t('english')}</Paragraph>
              </View>
              <Paragraph style={user?.emailVerified ? styles.verified : styles.notVerified}>
                {user?.emailVerified ? t('emailVerified') : t('emailNotVerified')}
              </Paragraph>
              {!user?.emailVerified && (
                <Button mode="text" onPress={handleSendVerification} style={styles.verifyButton}>
                  {t('resendVerification')}
                </Button>
              )}
              {verifMsg ? <Paragraph style={styles.success}>{verifMsg}</Paragraph> : null}
              <Paragraph style={styles.provider}>
                {t('method')}: {user?.providerData[0]?.providerId === 'password' ? t('emailPassword') : user?.providerData[0]?.providerId === 'google.com' ? 'Google' : user?.providerData[0]?.providerId === 'facebook.com' ? 'Facebook' : t('other')}
              </Paragraph>
            </View>
          </View>
          {error ? <Paragraph style={styles.error}>{error}</Paragraph> : null}
          {success ? <Paragraph style={styles.success}>{success}</Paragraph> : null}
          <Button mode="contained" onPress={handleSave} style={styles.saveButton} loading={loading} disabled={loading}>
            {t('save')}
          </Button>
          <Button mode="outlined" onPress={handleLogout} style={styles.logoutButton}>
            {t('logout')}
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  info: { marginLeft: 16, flex: 1 },
  input: { marginBottom: 8 },
  avatarImg: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  email: { fontSize: 15, color: '#555', marginBottom: 2 },
  provider: { fontSize: 13, color: '#888' },
  saveButton: { marginTop: 12 },
  logoutButton: { marginTop: 16 },
  error: { color: 'red', marginTop: 8, textAlign: 'center' },
  success: { color: 'green', marginTop: 8, textAlign: 'center' },
  verified: { color: 'green', fontSize: 13, marginBottom: 2 },
  notVerified: { color: 'red', fontSize: 13, marginBottom: 2 },
  verifyButton: { marginTop: 4, marginBottom: 4 },
  languageRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 8 },
  languageLabel: { fontSize: 14, marginRight: 8 },
  langButton: { marginHorizontal: 2, height: 32 },
  languageSelected: { fontSize: 13, color: '#888' },
}); 