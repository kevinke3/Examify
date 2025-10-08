const Button = ({ children, className = '', ...props }) => (
  <button className={`transition-colors ${className}`} {...props}>
    {children}
  </button>
);

export { Button };