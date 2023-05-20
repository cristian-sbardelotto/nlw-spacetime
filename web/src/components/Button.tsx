type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset'; 
  classes?: string;
};

export function Button({ children, type, classes }: ButtonProps) {
  return (
    <button
      className={`inline-block uppercase rounded-full bg-green-500 px-5 py-3 font-alt text-sm leading-none text-black hover:bg-green-700 transition-colors ${classes}`}
      type={type}
    >
      {children}
    </button>
  );
}
