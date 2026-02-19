import '@/global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ErrorBoundary } from './error-boundary';
import { ToastProvider } from '@/components/ToastProvider';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />
        <Stack screenOptions={{ headerShown: false }} />
      </ToastProvider>
    </ErrorBoundary>
  );
}
