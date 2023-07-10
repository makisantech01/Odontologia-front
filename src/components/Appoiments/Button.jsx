import clsx from "clsx";

const Button = ({ onClick, className, children }) => (
  <button
    onClick={onClick}
    className={clsx(
      "text-white w-[30%] bg-primary active:bg-primary/75 text-sm px-4 py-1.5 rounded",
      className
    )}
  >
    {children}
  </button>
);

export default Button;
