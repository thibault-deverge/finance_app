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
function ModalSelectColor({ title }: { title: string }) {
  const [value, setValue] = useState('');

  return (
    <div className="mb-4">
      <Label className="text-preset-5-bold text-grey-500 mb-2">{title}</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full px-5 py-5 hover:cursor-pointer">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white">
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <ColorSelectItem color="green" label="Green" value="green" />
            <ColorSelectItem color="yellow" label="Yellow" value="yellow" />
            <ColorSelectItem color="navy" label="Navy" value="navy" />
            <ColorSelectItem color="red" label="Red" value="red" />
            <ColorSelectItem color="purple" label="Purple" value="purple" />
            <ColorSelectItem
              color="turquoise"
              label="Turquoise"
              value="turquoise"
            />
            <ColorSelectItem color="brown" label="Brown" value="brown" />
            <ColorSelectItem color="magenta" label="Magenta" value="magenta" />
            <ColorSelectItem color="blue" label="Blue" value="blue" />
            <ColorSelectItem
              color="navy-grey"
              label="Navy Grey"
              value="navy-grey"
            />
            <ColorSelectItem color="army" label="Army" value="army" />
            <ColorSelectItem
              color="purple-seconday"
              label="Pink"
              value="pink"
            />
            <ColorSelectItem color="gold" label="Gold" value="gold" />
            <ColorSelectItem color="orange" label="Orange" value="orange" />
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ModalSelectColor;
