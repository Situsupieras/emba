# Plan de mejoras — Inteligencia Prenatal

Fecha de la revisión: 2026-11-14. Commit revisado: `71ca15f` (versión 0.9.0).

Este plan solo lista lo que se comprobó leyendo el código o corriendo un comando. Cada
hallazgo dice cómo se verificó. Lo que no se pudo comprobar está en la sección
"No verificado" y lo que requiere una decisión del dueño del proyecto está en
"Decisiones pendientes". Nada de este plan se ejecutó: la revisión no cambió código.

## Estado de avance

**Fase 1 — hecha el 2026-11-14 (sin commit todavía).** Verificado desde una instalación
limpia: `npm ci`, `npm run typecheck`, `npm run lint`, `npm test` (29 tests) y
`expo export --platform android` terminan sin error. La app no se probó en dispositivo.
El workflow de CI está escrito pero no ha corrido en GitHub.

Qué cambió:
- Versiones alineadas con Expo SDK 54 y `package-lock.json` regenerado. Se quitó el
  `overrides` de `@expo/config-plugins` (B3): sin él se instala la 54.0.6, que es la
  de SDK 54.
- `babel-preset-expo` declarado como dependencia de desarrollo; sin eso Jest no cargaba.
- Se borró `src/data/fetalDevelopment.ts` (1 709 líneas, 80 de los 94 errores). Ningún
  archivo lo importaba: la app lee el desarrollo fetal de `src/locales/` a través de
  `src/services/fetalDevelopmentService.ts`.
- `MedicalFeedbackScreen` toma `MaterialCommunityIcons` de `@expo/vector-icons` y se
  quitó `react-native-vector-icons` (B5).
- `src/security/backup.ts`: se quitó el import sin uso de `expo-file-system` (no estaba
  declarado en `package.json`) y se corrigieron sus tipos.
- ESLint con `eslint-config-expo`; scripts `lint` y `typecheck`.
- `expo install --fix` agregó el plugin `expo-localization` a `app.json`.

Qué queda abierto de la Fase 1:
- 62 avisos de lint (43 son variables sin usar). No bloquean; conviene limpiarlos en
  la Fase 4.
- `npm audit --omit=dev` bajó de 49 a 29 vulnerabilidades (0 críticas, 14 altas).
  El resto es de la Fase 2.
- `src/generate-i18n-structure.js` está excluido del lint; se decide en la Fase 2 (D1).

Hallazgo nuevo: en `src/utils/constants/appConstants.ts` los nombres de
`EXCHANGE_RATE` están invertidos (`GTQ_TO_USD` vale 7.8 y `USD_TO_GTQ` vale 1/7.8).
El cálculo de `supplementConverter.ts` da el resultado correcto porque usa el nombre
invertido. No se tocó.

Las cifras de "Cómo se verificó" y de los hallazgos B1, B2, B3, B5, C1, C2 y C3 son
las de antes de la Fase 1.

## Cómo se verificó

| Comprobación | Comando | Resultado |
|---|---|---|
| Instalación limpia | `npm ci` | Falla con `ERESOLVE` |
| Instalación forzada | `npm ci --legacy-peer-deps` | Pasa (997 paquetes) |
| Tipos | `tsc --noEmit` | 94 errores |
| Tests | `jest` | "No tests found", sale con código 1 |
| Lint | — | ESLint no está instalado |
| Vulnerabilidades | `npm audit --omit=dev` | 49 (4 críticas, 28 altas, 10 moderadas, 7 bajas) |
| Versiones Expo | `expo install --check` | 18 paquetes fuera de la versión esperada |

No se arrancó la app ni se probó en dispositivo, emulador o navegador.

## Hallazgos

### A. Seguridad y privacidad (prioridad alta)

**A1. La encriptación es una simulación y no se puede revertir.**
`src/security/encryption.ts`: `simulateAESEncryption` devuelve un hash SHA-256 del dato,
la clave y el IV; `simulateAESDecryption` devuelve un arreglo de ceros. El tag GCM es el
texto fijo `'gcm_tag'`. Cualquier dato guardado con `secureStore()` de esa clase se
pierde. Hoy nadie la llama (ver A2), así que no hay pérdida de datos activa.

**A2. El módulo `src/security/` casi no está conectado a la app.**
Fuera de `src/security/`, ningún archivo usa `securityManager`, `authManager`,
`auditManager`, `gdprManager`, `securityMonitoring` ni `backupManager`. `App.tsx` solo
llama `securityFramework.initialize()`, que no inicializa nada (la única línea útil está
comentada). El único archivo del módulo en uso real es `secureStore.ts`. Son unas 2 000
líneas sin efecto.

**A3. Los puntajes de cumplimiento están escritos a mano.**
`src/security/index.ts` devuelve `compliant: true` con 95 (ISO 27001) y 98 (GDPR) como
constantes. `docs/SECURITY_COMPLIANCE.md` repite esos números y agrega HIPAA 97 %. Al
mismo tiempo `FUNCIONALIDADES_PENDIENTES.md` marca seguridad, backup, cumplimiento y
monitoreo como "NO IMPLEMENTADO". Los dos documentos se contradicen; el código respalda
al segundo.

**A4. El chat envía datos médicos a un servidor externo sin pantalla de consentimiento.**
`src/data/chatService.ts` arma un contexto con nombre, correo, edad, semana, dieta,
última consulta médica (peso, presión arterial, latido fetal, notas de ultrasonido) y
recomendaciones activas, y lo envía a
`https://situsupieras.org/n8n/webhook/chat_Inteligencia_Prenatal`. En `src/screens` y
`src/components` no hay ninguna mención a consentimiento, privacidad o términos.

**A5. Datos locales bastan para entrar sin sesión.**
`App.tsx` muestra la app principal si existe `userProfile`, `userName` o `semanas` en el
almacenamiento, aunque Firebase no tenga usuario autenticado
(`shouldShowMain = user || hasUserData`). Además `firebaseConfig.ts` usa `getAuth()` sin
persistencia, y `@react-native-async-storage/async-storage` está instalado pero no se
importa en ningún archivo.

**A6. En web, los datos sensibles van a `localStorage` sin cifrar.**
`src/security/secureStore.ts` usa `window.localStorage` cuando la plataforma es web.
Ahí se guardan el perfil y los datos médicos.

**A7. Configuración de Firebase escrita en el código.**
`src/config/environment.ts` trae la API key y los identificadores del proyecto como
valor por defecto. No hay `.env` ni `.env.example`. Una API key web de Firebase no es
un secreto por sí sola, pero su seguridad depende de las reglas y restricciones del
proyecto Firebase, que no se pudieron revisar desde el repo.

**A8. 49 vulnerabilidades en dependencias de producción.**
Críticas: `protobufjs`, `shell-quote`, `tar`, `websocket-driver`. Entre las altas hay
cuatro dependencias directas: `@react-navigation/native`, `bottom-tabs`, `native-stack`
y `stack`.

### B. Build y dependencias (prioridad alta)

**B1. `npm ci` falla en un clon limpio.**
`@types/react@~19.0.10` choca con el peer `@types/react@^19.1.0` de
`react-native@0.81.4`. Solo instala con `--legacy-peer-deps`.

**B2. 18 paquetes fuera de la versión que Expo SDK 54 espera.**
Incluye `expo` (54.0.12, espera ~54.0.37), `react-native` (0.81.4, espera 0.81.5),
`react-native-worklets` (0.6.0, espera 0.5.1), `@types/react` y `typescript`.

**B3. `package.json` fija `overrides` de `@expo/config-plugins` a `~10.1.1`.**
No hay nota que explique por qué. Hay que confirmar si sigue haciendo falta con SDK 54.

**B4. Dependencias declaradas que ningún archivo importa.**
`expo-auth-session`, `expo-av`, `expo-sqlite`, `expo-linear-gradient`,
`expo-status-bar`, `lottie-react-native`, `react-native-svg`, `@react-navigation/stack`,
`@react-native-async-storage/async-storage`. `expo-sqlite` además está como plugin en
`app.json`. Otras sin import directo (`react-native-screens`, `safe-area-context`,
`gesture-handler`, `reanimated`, `worklets`, `expo-font`, `@expo/metro-runtime`,
`metro`) pueden ser requisitos de otras librerías: revisar una por una antes de quitar.

**B5. Dos librerías de iconos.**
`@expo/vector-icons` (6 archivos) y `react-native-vector-icons` (1 archivo,
`MedicalFeedbackScreen.tsx`, sin tipos: error `TS7016`).

### C. Calidad de código (prioridad media)

**C1. 94 errores de TypeScript.**
- 80 en `src/data/fetalDevelopment.ts`: falta la propiedad `motherChanges` que el tipo
  `FetalDevelopment` exige.
- 8 en `src/security/backup.ts`.
- 3 en `src/security/secureStore.ts`: directivas `@ts-expect-error` que ya no aplican.
- 2 en `src/screens/MedicalFeedbackScreen.tsx`, 1 en `src/data/mockData.ts`.

**C2. Cero tests.**
El script `test` corre `jest`, pero no hay archivos de test, ni configuración de Jest,
ni `jest-expo`.

**C3. ESLint no funciona.**
`eslint.config.js` importa `@eslint/js` y `typescript-eslint`, y usa plugins de React y
React Native. Ninguno está en `package.json`, y no hay script `lint`.

**C4. Sin integración continua.**
No existe `.github/` ni otro pipeline.

**C5. Pantallas con datos de prueba.**
`HomeScreen` y `StoreScreen` importan `mockUser` (una usuaria ficticia con correo y
fecha de parto fijos). `StoreScreen`, `SupplementsScreen`, `CommunityScreen` y
`GuideScreen` muestran productos, publicaciones y artículos de `mockData.ts`. Las
imágenes de producto apuntan a `via.placeholder.com`.

**C6. Dos hooks `useUserData` distintos.**
Uno en `src/data/mockData.ts` (lo usan tres pantallas) y otro en
`src/hooks/useUserData.ts` (no lo importa ninguna pantalla).

**C7. Acceso al almacenamiento sin una sola vía.**
Nueve archivos importan `expo-secure-store` directo y otros usan `SecureStoreCompat`.
Las claves (`userProfile`, `semanas`, `language`, etc.) están repetidas como texto en
cada archivo.

**C8. Problemas puntuales en `App.tsx`.**
- `Notifications.setNotificationHandler` se llama en cada render.
- La notificación de bienvenida se programa en cada arranque con usuario.
- Importa `initializeApp` de Firebase y declara una función local con el mismo nombre.
- `user` está tipado como `any`. En total hay 37 usos de `any` en `src` y `App.tsx`.

**C9. Logs de depuración en producción.**
`src/config/i18n.ts` imprime `🔍 DEBUG` al cargar. `AuthScreen.tsx` imprime el perfil
completo de la usuaria al registrarse.

**C10. Textos fijos en español fuera de i18n.**
`AuthScreen.tsx` tiene los mensajes de error y de carga escritos en español. `App.tsx`
también ("Inicializando seguridad...", notificación de bienvenida).

### D. Higiene del repositorio (prioridad media)

**D1. Archivos sueltos en la raíz.**
- `tall expo-cryptoq`: es una salida de `git log` guardada por error.
- `tu-script.ps1` y `src/generate-i18n-structure.js`: scripts de una migración de
  traducciones ya hecha.
- `dos.html`, `unio.html`, `index.html`, `app-icon.html`: propósito no documentado.

**D2. Carpetas rastreadas que deberían ignorarse.**
`.expo/` está en `.gitignore` pero tiene 2 archivos rastreados. `.idea/` tiene 7
archivos rastreados y no está en `.gitignore`.

**D3. Versiones inconsistentes.**
`package.json` y `app.json` dicen 0.9.0. `src/config/environment.ts` dice 1.0.0.
`TAREAS.md` dice 1.1.0. Los tags son `v1.2.0`, `v1.1.0` y luego `v0.9.0`.

### E. Documentación desactualizada (prioridad media)

**E1. Cuatro documentos dicen "listo para producción".**
`README.md`, `ESTADO_FINAL_PROYECTO.md`, `TAREAS.md` y `DIRECTRICES_DE_DESARROLLO.md`.
El último commit llama a la versión "0.9.0 - Beta", y los hallazgos A, B y C lo
contradicen.

**E2. Datos concretos equivocados.**
- `README.md` dice Expo SDK 53; el proyecto usa SDK 54.
- `TAREAS.md` lista "Autenticación con Google" como completada; `expo-auth-session` no
  se importa y `AuthScreen.tsx` solo tiene correo y contraseña.
- `docs/SECURITY_COMPLIANCE.md` y `FUNCIONALIDADES_PENDIENTES.md` tienen
  `${new Date().toISOString()}` sin resolver como fecha, y el segundo deja
  `[tu_email@ejemplo.com]` como contacto.
- `docs/SECURITY_COMPLIANCE.md` enlaza `./GDPR_GUIDE.md`, que no existe.

## Plan propuesto

Las fases van en orden de dependencia. Cada una es una rama y un PR propio.

### Fase 0 — Decisiones (sin código)
Responder las preguntas de "Decisiones pendientes". Las fases 3 y 5 dependen de ellas.

### Fase 1 — Que el proyecto instale y se pueda verificar
1. Alinear versiones con `npx expo install --fix` y regenerar `package-lock.json`
   (resuelve B1 y B2). Confirmar que `npm ci` pasa sin banderas.
2. Decidir sobre el `overrides` de B3 probando la instalación sin él.
3. Corregir los 94 errores de tipos (C1) hasta que `tsc --noEmit` salga en cero.
4. Instalar y configurar ESLint de forma que corra (C3). Agregar scripts `lint` y
   `typecheck`.
5. Agregar `jest-expo` y un primer test por cada unidad pura que ya existe:
   `calculateTrimester`/`isValidWeek`, `supplementConverter`, `personalization`,
   `fetalDevelopmentService` (C2).
6. Agregar un pipeline de CI que corra instalación, tipos, lint y tests (C4).

Hecho cuando: `npm ci`, `tsc --noEmit`, `lint` y `jest` pasan en CI.

### Fase 2 — Limpieza del repositorio
1. Borrar o mover los archivos de D1 (confirmar antes el uso de los `.html`).
2. Dejar de rastrear `.expo/` y `.idea/`; agregar `.idea/` al `.gitignore` (D2).
3. Quitar las dependencias sin uso confirmadas en B4 y unificar la librería de iconos
   (B5).
4. Unificar el número de versión en una sola fuente (D3).
5. Volver a correr `npm audit` y resolver lo que quede de A8.

Hecho cuando: la raíz solo tiene archivos con propósito, y `npm audit` no reporta
críticas ni altas sin justificar.

### Fase 3 — Seguridad y privacidad
Depende de las decisiones 1 a 4.
1. Módulo `src/security/` (A1, A2, A3): quitarlo y dejar solo `secureStore.ts`, o
   implementarlo de verdad y conectarlo. En ambos casos eliminar los puntajes fijos.
2. Sesión (A5): configurar persistencia de Firebase Auth y dejar de usar los datos
   locales como sustituto de la sesión.
3. Chat (A4): pantalla de consentimiento antes del primer envío y reducir el contexto
   al mínimo que el chat necesite.
4. Web (A6): según la decisión 3, quitar el soporte web o definir cómo se protegen ahí
   los datos.
5. Firebase (A7): mover la configuración a variables de entorno con `.env.example`, y
   revisar reglas y restricciones de la API key en la consola.

### Fase 4 — Calidad de código
1. Un solo acceso al almacenamiento, con las claves en un archivo de constantes (C7).
2. Un solo `useUserData` (C6).
3. Corregir `App.tsx` (C8) y quitar los logs de depuración (C9).
4. Pasar a i18n los textos fijos (C10).
5. Reducir los `any`, empezando por navegación y `App.tsx`.

### Fase 5 — Datos reales
Depende de la decisión 5. Reemplazar `mockData.ts` en tienda, comunidad, guía y
suplementos por la fuente de datos que se defina (C5).

### Fase 6 — Documentación
Hacerla al cierre de cada fase, no al final.
1. Corregir las afirmaciones de E1 y E2 para que digan el estado real.
2. Unir los documentos de estado (`ESTADO_FINAL_PROYECTO.md`, `TAREAS.md`,
   `DEV_LOG.md`, `FUNCIONALIDADES_PENDIENTES.md`) en uno solo, para que no vuelvan a
   contradecirse.
3. Reescribir `docs/SECURITY_COMPLIANCE.md` según lo que quede tras la fase 3.

## Decisiones pendientes

1. **¿La app va a publicarse con usuarias reales, y en qué países?** De eso depende qué
   normas de privacidad aplican. Los documentos mencionan GDPR e HIPAA, pero el código
   no las cumple.
2. **¿El módulo `src/security/` se elimina o se implementa?**
3. **¿Web es una plataforma objetivo o solo sirve para desarrollo?**
4. **¿Quién opera el webhook de n8n y qué hace con los datos médicos que recibe?**
5. **¿De dónde saldrán los datos reales de tienda, comunidad y artículos?** El repo no
   tiene backend ni usa Firestore.
6. **¿Qué número de versión es el correcto?** Hay tags 1.x anteriores al 0.9.0 actual.
7. **¿Los archivos `dos.html`, `unio.html`, `index.html` y `app-icon.html` se usan?**

## No verificado

- Que la app arranque y funcione en Android, iOS o web. No se ejecutó.
- Las reglas de seguridad y las restricciones de la API key en la consola de Firebase.
- Si el repositorio de GitHub es público o privado.
- Qué hace el webhook de n8n con los datos.
- Que todas las claves de traducción usadas en las pantallas existan en ambos idiomas.
  Solo se comprobaron dos (`chatTitle`, `profileTitle`).
- La exactitud médica del contenido (desarrollo fetal, suplementos, dosis). Requiere
  revisión de un profesional de salud.
- El contenido de `docs/investigacion71025suplementos.docx`.
- Las 49 vulnerabilidades se contaron instalando con `--legacy-peer-deps`; el número
  puede cambiar tras la fase 1.
