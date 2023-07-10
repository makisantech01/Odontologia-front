import clsx from "clsx";

const Cell = ({ onClick, children, className, isActive = false }) => {
  return (
    <div
      onClick={!isActive ? onClick : undefined}
      className={clsx(
        "h-10 rounded-full flex items-center justify-center select-none transition-colors",
        {
          "cursor-pointer hover:bg-gray-100 active:bg-gray-200":
            !isActive && onClick,
          "font-bold text-white bg-primary": isActive,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Cell;
