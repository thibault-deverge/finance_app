type TitleProps = {
  name: string;
};

function Title({ name }: TitleProps) {
  return <h1 className="text-preset-1 text-grey-900">{name}</h1>;
}

export default Title;
