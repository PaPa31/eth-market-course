export default function Button({
  children,
  className,
  hoverable = true,
  variant = "purple",
  ...rest
}) {
  const variants = {
    white: "text-black bg-white",
    purple: `text-white bg-indigo-600 ${hoverable && "hover:bg-indigo-700"}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      hoverable && "hover:bg-indigo-200"
    }`,
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
    orange: `text-black bg-orange-200 ${hoverable && "hover:bg-red-700"}`,
  };

  return (
    <button
      {...rest}
      className={`disabled:opacity-50 disabled:cursor-not-allowed xs:px-8 xs:py-3 p-2 border rounded-md text-base fon-medium ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
