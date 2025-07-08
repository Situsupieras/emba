import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Avatar, TextInput, ActivityIndicator, Chip } from 'react-native-paper';
import { signOut, updateProfile, sendEmailVerification } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
import { auth } from '../data/firebaseConfig';
import { t, setLanguage, getCurrentLanguage } from '../data/i18n';
import I18n from 'i18n-js';

export default function ProfileScreen() {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [verifMsg, setVerifMsg] = useState('');
  const [language, setLanguageState] = useState('es');
  
  // Campos del perfil de embarazo
  const [age, setAge] = useState('25');
  const [currentWeek, setCurrentWeek] = useState('12');
  const [diet, setDiet] = useState('omnívora');
  const [previousChildren, setPreviousChildren] = useState('0');
  const [hasBoughtSupplements, setHasBoughtSupplements] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    loadUserProfile();
    loadUserLanguage();
  }, []);

  const loadUserLanguage = async () => {
    try {
      const savedLanguage = await SecureStore.getItemAsync('userLanguage');
      if (savedLanguage) {
        setLanguageState(savedLanguage);
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const loadUserProfile = async () => {
    try {
      const userProfileData = await SecureStore.getItemAsync('userProfile');
      if (userProfileData) {
        const profile = JSON.parse(userProfileData);
        setDisplayName(profile.name || '');
        setAge(profile.age?.toString() || '25');
        setCurrentWeek(profile.currentWeek?.toString() || '12');
        setDiet(profile.diet || 'omnívora');
        setPreviousChildren(profile.previousChildren?.toString() || '0');
        setHasBoughtSupplements(profile.hasBoughtSupplements || false);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const saveUserProfile = async () => {
    try {
      const userData = {
        name: displayName,
        age: Number(age),
        currentWeek: Number(currentWeek),
        diet,
        previousChildren: Number(previousChildren),
        hasBoughtSupplements,
        supplements: [],
        email: user?.email,
      };
      console.log('ProfileScreen - Guardando perfil actualizado:', userData);
      await SecureStore.setItemAsync('userProfile', JSON.stringify(userData));
      // También actualizar el campo 'semanas' para compatibilidad
      await SecureStore.setItemAsync('semanas', currentWeek);
      setSuccess('Perfil actualizado correctamente.');
      setIsEditing(false);
    } catch (error) {
      setError('Error al guardar el perfil.');
      console.error('Error saving user profile:', error);
    }
  };

  // Si user es undefined, mostrar loader
  if (typeof user === 'undefined') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Paragraph style={styles.loadingText}>Cargando perfil...</Paragraph>
      </View>
    );
  }

  // Si user es null, mostrar mensaje
  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Paragraph style={styles.errorText}>No hay usuario autenticado.</Paragraph>
      </View>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError('Error al cerrar sesión.');
    }
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
      await saveUserProfile();
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

  const handleChangeLanguage = async (lang: string) => {
    setLanguageState(lang);
    setLanguage(lang);
    try {
      await SecureStore.setItemAsync('userLanguage', lang);
      // Forzar actualización del idioma en toda la app
      I18n.locale = lang;
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {/* Header con foto y nombre */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handlePickImage} disabled={!isEditing}>
              {photoURL ? (
                <Image source={{ uri: photoURL }} style={styles.avatarImg} />
              ) : (
                <Avatar.Text 
                  size={80} 
                  label={displayName ? displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || '?'} 
                  style={styles.avatar}
                />
              )}
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <TextInput
                label="Nombre completo"
                value={displayName}
                onChangeText={setDisplayName}
                style={styles.nameInput}
                disabled={!isEditing}
                mode="outlined"
              />
              <Paragraph style={styles.email}>{user?.email}</Paragraph>
            </View>
          </View>

          {/* Campos del perfil de embarazo */}
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>Información del Embarazo</Title>
            
            {isEditing ? (
              <View style={styles.editFields}>
                <TextInput
                  label="Edad"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                />
                <TextInput
                  label="Semana actual de embarazo"
                  value={currentWeek}
                  onChangeText={setCurrentWeek}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                />
                <TextInput
                  label="Hijos previos"
                  value={previousChildren}
                  onChangeText={setPreviousChildren}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                />
                
                <Paragraph style={styles.pickerLabel}>Tipo de dieta</Paragraph>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={diet}
                    onValueChange={setDiet}
                    style={styles.picker}
                  >
                    <Picker.Item label="Omnívora" value="omnívora" />
                    <Picker.Item label="Vegetariana" value="vegetariana" />
                    <Picker.Item label="Vegana" value="vegana" />
                  </Picker>
                </View>
                
                <Button
                  mode={hasBoughtSupplements ? 'contained' : 'outlined'}
                  onPress={() => setHasBoughtSupplements(!hasBoughtSupplements)}
                  style={styles.supplementButton}
                  icon={hasBoughtSupplements ? 'check' : 'close'}
                >
                  {hasBoughtSupplements ? 'Ha comprado suplementos' : 'No ha comprado suplementos'}
                </Button>
              </View>
            ) : (
              <View style={styles.infoDisplay}>
                <View style={styles.infoRow}>
                  <Chip icon="calendar" style={styles.infoChip}>Edad: {age} años</Chip>
                  <Chip icon="heart" style={styles.infoChip}>Semana: {currentWeek}</Chip>
                </View>
                <View style={styles.infoRow}>
                  <Chip icon="baby-face" style={styles.infoChip}>Hijos previos: {previousChildren}</Chip>
                  <Chip icon="food-apple" style={styles.infoChip}>Dieta: {diet}</Chip>
                </View>
                <Chip 
                  icon={hasBoughtSupplements ? 'check-circle' : 'close-circle'} 
                  style={[styles.infoChip, hasBoughtSupplements ? styles.positiveChip : styles.negativeChip]}
                >
                  Suplementos: {hasBoughtSupplements ? 'Sí' : 'No'}
                </Chip>
              </View>
            )}
          </View>

          {/* Configuración de idioma */}
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>Idioma / Language</Title>
            <View style={styles.languageButtons}>
              <Button 
                mode={language === 'es' ? 'contained' : 'outlined'} 
                onPress={() => handleChangeLanguage('es')} 
                style={styles.langButton}
                icon="flag"
              >
                Español
              </Button>
              <Button 
                mode={language === 'en' ? 'contained' : 'outlined'} 
                onPress={() => handleChangeLanguage('en')} 
                style={styles.langButton}
                icon="flag"
              >
                English
              </Button>
            </View>
          </View>

          {/* Verificación de email */}
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>Verificación de Email</Title>
            <View style={styles.verificationStatus}>
              <Chip 
                icon={user?.emailVerified ? 'check-circle' : 'alert-circle'} 
                style={[styles.verificationChip, user?.emailVerified ? styles.verifiedChip : styles.notVerifiedChip]}
              >
                {user?.emailVerified ? 'Email verificado' : 'Email no verificado'}
              </Chip>
              {!user?.emailVerified && (
                <Button 
                  mode="outlined" 
                  onPress={handleSendVerification} 
                  style={styles.verifyButton}
                  icon="email-send"
                >
                  Reenviar verificación
                </Button>
              )}
            </View>
            {verifMsg ? <Paragraph style={styles.success}>{verifMsg}</Paragraph> : null}
          </View>

          {/* Mensajes de error y éxito */}
          {error ? <Paragraph style={styles.error}>{error}</Paragraph> : null}
          {success ? <Paragraph style={styles.success}>{success}</Paragraph> : null}
          
          {/* Botones de acción */}
          <View style={styles.actionButtons}>
            {!isEditing ? (
              <Button 
                mode="contained" 
                onPress={() => setIsEditing(true)} 
                style={styles.editButton}
                icon="pencil"
              >
                Editar perfil
              </Button>
            ) : (
              <View style={styles.editButtons}>
                <Button 
                  mode="contained" 
                  onPress={handleSave} 
                  style={styles.saveButton} 
                  loading={loading} 
                  disabled={loading}
                  icon="content-save"
                >
                  Guardar
                </Button>
                <Button 
                  mode="outlined" 
                  onPress={() => setIsEditing(false)} 
                  style={styles.cancelButton}
                  icon="close"
                >
                  Cancelar
                </Button>
              </View>
            )}
            
            <Button 
              mode="outlined" 
              onPress={handleLogout} 
              style={styles.logoutButton}
              icon="logout"
            >
              Cerrar sesión
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  card: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: '#6200ee',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  nameInput: {
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  editFields: {
    gap: 12,
  },
  input: {
    marginBottom: 8,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 12,
  },
  picker: {
    height: 50,
  },
  supplementButton: {
    marginTop: 8,
  },
  infoDisplay: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoChip: {
    flex: 1,
    marginHorizontal: 4,
  },
  positiveChip: {
    backgroundColor: '#e8f5e8',
  },
  negativeChip: {
    backgroundColor: '#ffe8e8',
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  langButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  verificationStatus: {
    alignItems: 'center',
    gap: 12,
  },
  verificationChip: {
    marginBottom: 8,
  },
  verifiedChip: {
    backgroundColor: '#e8f5e8',
  },
  notVerifiedChip: {
    backgroundColor: '#ffe8e8',
  },
  verifyButton: {
    marginTop: 8,
  },
  actionButtons: {
    marginTop: 24,
    gap: 12,
  },
  editButton: {
    marginBottom: 8,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  saveButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
  logoutButton: {
    borderColor: '#ff4444',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: '#ffe8e8',
    borderRadius: 4,
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: '#e8f5e8',
    borderRadius: 4,
  },
}); 