type SwitchAuthProps = {
  onClick: () => void;
  isLogin: boolean;
};

function SwitchAuth({ onClick, isLogin }: SwitchAuthProps) {
  const pText = isLogin
    ? 'Need to create an account?'
    : 'Already have an account?';

  const btnText = isLogin ? 'Sign Up' : 'Login';

  return (
    <div className="flex items-center justify-center gap-2">
      <p className="text-preset-4 text-grey-500">{pText}</p>
      <button
        onClick={onClick}
        className="text-preset-4-bold text-grey-900 hover:text-grey-500 cursor-pointer border-b capitalize transition-all duration-200"
      >
        {btnText}
      </button>
    </div>
  );
}

export default SwitchAuth;
