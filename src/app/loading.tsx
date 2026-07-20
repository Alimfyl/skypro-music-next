import { MainLayout } from '@/components/MainLayout/MainLayout';

export default function Loading() {
  return (
    <MainLayout
      title="Треки"
      tracks={[]}
      message="Загрузка треков..."
    />
  );
}