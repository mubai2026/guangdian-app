export default function PrimaryButton({ children, className = '', onClick, disabled }: { children: React.ReactNode; className?: string; onClick?: () => void; disabled?: boolean }) {
  return <button className={`primary-button ${className}`} onClick={onClick} disabled={disabled}>{children}</button>;
}
