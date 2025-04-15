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
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
};

function MobileSelectMenu({
  iconSrc,
  alt,
  label,
  value,
  onChange,
  options,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button">
            <img src={iconSrc} alt={alt} className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={30}
          alignOffset={-100}
          className="w-fit border-none px-5 md:hidden"
        >
          <ul className="flex flex-col gap-3">
            <li>
              <Button
                variant="ghost"
                className={`border-grey-100 text-grey-500 w-full justify-start rounded-none border-b-1 py-3 text-left text-sm`}
              >
                {label}
              </Button>
            </li>
            {options.map((opt) => (
              <li key={opt.value}>
                <Button
                  variant="ghost"
                  className={`border-grey-100 w-full justify-start rounded-none border-b-1 py-3 text-left text-sm last:border-b-0 ${
                    opt.value === value && 'font-bold'
                  }`}
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
    </div>
  );
}

export default MobileSelectMenu;
