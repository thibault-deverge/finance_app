/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'; // ← part of shadcn
import { Button } from '@/components/ui/button';

type Option = {
  value: string;
  label: string;
};

type Props = {
  iconSrc: string;
  alt: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
};

function MobileSelectMenu({ iconSrc, alt, value, onChange, options }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button">
          <img src={iconSrc} alt={alt} className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-[200px] p-2">
        <ul className="flex flex-col gap-2">
          {options.map((opt) => (
            <li key={opt.value}>
              <Button
                variant={value === opt.value ? 'default' : 'ghost'}
                className="w-full justify-start text-left text-sm"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export default MobileSelectMenu;
