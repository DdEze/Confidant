import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIF_PERMISSION_KEY = 'notif_permission_granted';
const NOTIF_SCHEDULED_KEY = 'notif_scheduled';

export async function requestNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status === 'granted') return true;

  const { status: newStatus } = await Notifications.requestPermissionsAsync();
  return newStatus === 'granted';
}

export async function scheduleDailyNotification(hour = 20, minute = 0) {
  const notifScheduled = await AsyncStorage.getItem(NOTIF_SCHEDULED_KEY);
  if (notifScheduled === 'true') {
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hora de escribir ✍️',
      body: 'No olvides registrar tu entrada de hoy en tu diario.',
      sound: true,
    },
    trigger: {
      hour,
      minute,
      repeats: true,
      type: 'daily',
    } as any,
  });

  await AsyncStorage.setItem(NOTIF_SCHEDULED_KEY, 'true');
}

export async function ensureNotificationSetup(hour = 20, minute = 0) {
  const permissionStored = await AsyncStorage.getItem(NOTIF_PERMISSION_KEY);
  let hasPermission = false;

  if (permissionStored === 'true') {
    hasPermission = true;
  } else {
    hasPermission = await requestNotificationPermissions();
    await AsyncStorage.setItem(NOTIF_PERMISSION_KEY, hasPermission ? 'true' : 'false');
  }

  if (hasPermission) {
    await scheduleDailyNotification(hour, minute);
  }
}