# Confidant – Tu diario emocional digital

![React Native](https://img.shields.io/badge/React_Native-0.74.0-61DAFB?logo=react&logoColor=white&style=flat)
![Expo](https://img.shields.io/badge/Expo-50.0.0-000020?logo=expo&logoColor=white&style=flat)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?logo=typescript&logoColor=white&style=flat)
![React Navigation](https://img.shields.io/badge/React_Navigation-6.1.6-000000?logo=reactrouter&style=flat)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-Persistence-FC8019?style=flat&logo=databricks&logoColor=white)
![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow)
![License](https://img.shields.io/github/license/DdEze/WeatherOn)

---

## Descripción

**Confidant** es una aplicación de diario emocional desarrollada en React Native con Expo, pensada para ayudarte a llevar un registro diario de tus emociones, pensamientos y actividades. Cada entrada permite identificar cómo te sentiste en el día mediante un emoji, acompañarlo con un texto reflexivo y luego visualizar todo en un historial accesible y ordenado por fecha.

La app incluye un gráfico de entradas semanales, lo que permite visualizar la frecuencia de tus registros a lo largo del tiempo. Esto facilita notar patrones emocionales o hábitos personales. La interfaz está diseñada para ser simple, amigable y funcional, permitiendo escribir con libertad y sin distracciones.

---

## Características principales

- **Escribir entradas diarias** con título, contenido y selección de estado emocional mediante emojis.
- **Editor completo** que permite crear nuevas entradas o editar las ya existentes.
- **Guardado automático** de las entradas para evitar pérdidas de información.
- **Adjuntar imágenes** a cada entrada para hacerlas más personales y visuales.
- **Visualización por calendario**, para navegar y consultar entradas según el día.
- **Protección con PIN** para mantener la privacidad de tus pensamientos.
- **Recordatorio diario** a las 20:00 hs para motivarte a escribir tu entrada del día.
- **Estadísticas y análisis**:
  - Cantidad de entradas semanales.
  - Emojis más usados para entender tu estado emocional a lo largo del tiempo.

---

## Roadmap futuro

- Modo oscuro

- Backup en la nube (Google Drive o iCloud)

- Compartir entradas como imágenes o PDF

- Exportar estadísticas a CSV

- Widgets para ver el emoji del día desde el inicio

---

## Tecnologías y librerías utilizadas

- **React Native** (versión 0.79.5)
- **Expo Go** y SDK Expo 53
- Navegación con **expo-router** y **React Navigation**
- Manejo de estados y contexto con React Context API
- **Async Storage** para persistencia local
- Selección y manejo de imágenes con **expo-image-picker**
- Calendario con **react-native-calendars**
- Gráficos estadísticos con **react-native-chart-kit**
- Notificaciones locales con **expo-notifications**
- Autenticación biométrica y PIN con **expo-local-authentication**
- Formato y manejo de fechas con **date-fns** y **dayjs**
- Íconos vectoriales con **@expo/vector-icons** y **react-native-vector-icons**

---

##  Instalación (modo local)

```bash
git clone https://github.com/tu-usuario/confidant.git
cd confidant
npm install
npx expo start
```

---

## Estructura del proyecto

```
├── .expo
├── .vscode
├── app
│   ├── (tabs)
│   │     ├── _layout.tsx
│   │     ├── calendar.tsx
│   │     ├── index.tsx
│   │     └── stats.tsx
│   ├── auth
│   │     └── index.tsx
│   ├── entry
│   │     ├── _layout.tsx
│   │     └── [id].tsx
│   └── _layout.tsx
├── components
│   ├── CalendarView.tsx
│   ├── JournalEntryForm.tsx
│   └── JournalEntryList.tsx
├── context
│   └── EntriesContext.tsx
├── node_modules
├── utils
│   ├── date.ts
│   ├── notificationService.ts
│   ├── getUvIndex.ts
│   └── storage.ts
├── .gitignore
├── app.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── types.ts
```

---

## Licencia

MIT License © 2025 [De Dominicis Ezequiel]