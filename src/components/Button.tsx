function Button({
  type = "primary",
  size = "small",
  disabled = false,
  children,
}: {
  type?: "primary" | "secondary" | "destructive";
  size?: "large" | "small" | "medium";
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const style = {
    primary: "bg-purple-dark text-white enabled:hover:bg-purple-light",
    secondary: "bg-white text-purple-dark hover:bg-opacity-80",
    destructive: "bg-red-dark text-white enabled:hover:bg-red-light",
    small: "py-2",
    large: "py-4 text-md",
    medium: "px-[1.125rem] py-[10px]",
  };

  return (
    <button
      disabled={disabled}
      className={`rounded-3xl px-6 text-base transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${style[type]} ${style[size]}`}
    >
      {children}
    </button>
  );
}

export default Button;
