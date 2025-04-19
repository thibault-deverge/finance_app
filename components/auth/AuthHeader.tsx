import Image from 'next/image';

function AuthHeader() {
  return (
    <header className="bg-grey-900 flex h-[7vh] items-center justify-center rounded-b-lg lg:hidden">
      <Image
        src={'/images/logo/logo-large.svg'}
        alt="Logo"
        width={122}
        height={22}
        quality={80}
        loading="lazy"
      />
    </header>
  );
}

export default AuthHeader;
