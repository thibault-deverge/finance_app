import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

function ColorSelectItem({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <SelectItem value={value}>
      <div className="flex items-center gap-2">
        <span
          style={{ backgroundColor: `var(--${color})` }}
          className={`h-4 w-4 rounded-full`}
        ></span>
        {label}
      </div>
    </SelectItem>
  );
}
function ModalSelectColor({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-5">
      <Label className="text-preset-5-bold text-grey-500 mb-2">{title}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full px-5 py-5 hover:cursor-pointer">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white">
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <ColorSelectItem color="green" label="Green" value="#277c78" />
            <ColorSelectItem color="yellow" label="Yellow" value="#f2cdac" />
            <ColorSelectItem color="navy" label="Navy" value="#626070" />
            <ColorSelectItem color="red" label="Red" value="#c94736" />
            <ColorSelectItem color="purple" label="Purple" value="#826cb0" />
            <ColorSelectItem
              color="turquoise"
              label="Turquoise"
              value="#597c7c"
            />
            <ColorSelectItem color="brown" label="Brown" value="#93674f" />
            <ColorSelectItem color="magenta" label="Magenta" value="#934f6f" />
            <ColorSelectItem color="blue" label="Blue" value="#3f82b2" />
            <ColorSelectItem
              color="navy-grey"
              label="Navy Grey"
              value="#97a0ac"
            />
            <ColorSelectItem color="army" label="Army" value="#7f9161" />
            <ColorSelectItem
              color="purple-seconday"
              label="Pink"
              value="#af81ba"
            />
            <ColorSelectItem color="gold" label="Gold" value="#cab361" />
            <ColorSelectItem color="orange" label="Orange" value="#be6c49" />
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ModalSelectColor;
