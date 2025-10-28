import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'type'>

const Button = ({ children, ...buttonProps }: ButtonProps) => (
  <button className="btn btn-primary" {...buttonProps}>
    {children}
  </button>
)

export default Button
