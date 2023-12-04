function Button({
  type = "primary",
  size = "small",
  disabled,
  children,
}: {
  type?: "primary" | "secondary" | "destructive";
  size?: "large" | "small" | "medium";
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const style = {
    primary:
      "bg-primary text-primary-foreground enabled:hover:bg-primary-hover",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
    destructive: "bg-destructive text-white hover:bg-destructive-hover",
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
