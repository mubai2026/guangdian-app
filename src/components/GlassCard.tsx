export default function GlassCard({ children, className = '', onClick, style }: { children: React.ReactNode; className?: string; onClick?: () => void; style?: React.CSSProperties }) {
  return <section className={`glass-card ${className}`} onClick={onClick} style={{ ...style, cursor: onClick ? 'pointer' : undefined }}>{children}</section>;
}