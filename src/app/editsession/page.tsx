import { Suspense } from 'react';
import EditSession from '@/components/EditSessionForm';

export default function EditSessionPage() {
  return (
    <Suspense fallback="Loading...">
      <EditSession />
    </Suspense>
  );
}
