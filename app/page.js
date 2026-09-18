import { Suspense } from 'react';
import PageContent from './components/PageContent';

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
