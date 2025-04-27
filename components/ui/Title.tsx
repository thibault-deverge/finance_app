import { TitleProps } from '@/lib/type';

function Title({ name }: TitleProps) {
  return <h1 className="text-preset-1 text-grey-900">{name}</h1>;
}

export default Title;
