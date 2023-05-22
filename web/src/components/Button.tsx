type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  classes?: string;
  backgroundColor?: string;
};

export function Button({
  children,
  type,
  classes,
  backgroundColor,
}: ButtonProps) {
  const background = backgroundColor ? backgroundColor : 'bg-green-500';

  return (
    <button
      className={`inline-block uppercase rounded-full ${background} px-5 py-3 font-alt text-sm leading-none text-black hover:brightness-75 transition-all duration-100 ${classes}`}
      type={type}
    >
      {children}
    </button>
  );
}
