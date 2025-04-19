import SelectInputMobile from '@/components/filters/SelectInputMobile';
import SelectInput from '@/components/filters/SelectInput';

type FilterControlsProps = {
  icon: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
};

function FilterControls({
  icon,
  value,
  label,
  onChange,
  options,
  className = '',
}: FilterControlsProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <SelectInputMobile
        iconSrc={`/images/icons/icon-${icon}.svg`}
        alt={label}
        label={label}
        value={value}
        onChange={onChange}
        options={options}
      />

      <SelectInput
        label={label}
        placeholder={label}
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  );
}

export default FilterControls;
