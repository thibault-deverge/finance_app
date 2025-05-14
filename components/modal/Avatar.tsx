// components/modal/AvatarInput.tsx
'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2 MB

export default function AvatarInput() {
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError('');
      return;
    }

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setError('Please select a PNG or JPEG image.');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      setError('File must be smaller than 1 MB.');
      e.target.value = '';
      return;
    }

    setError('');
  };

  return (
    <div className="mb-4">
      <Label className="text-preset-5-bold text-grey-500 mb-2" htmlFor="avatar">
        Avatar (PNG/JPEG, &lt;1 MB, Optional)
      </Label>
      <Input
        id="avatar"
        name="avatar"
        type="file"
        accept="image/png, image/jpeg"
        className="cursor-pointer"
        onChange={handleChange}
      />
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
    </div>
  );
}
