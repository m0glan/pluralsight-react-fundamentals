const Button = ({ onClick, children }) => (
  <button className="btn btn-primary" onClick={onClick}>{children}</button>
)

export default Button;