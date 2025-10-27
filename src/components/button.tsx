import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'>

const Button = ({ children, ...buttonProps }: ButtonProps) => (
  <button className="btn btn-primary" type="button" {...buttonProps}>
    {children}
  </button>
)

export default Button
