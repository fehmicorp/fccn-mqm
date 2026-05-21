import { textMapper, TextVariant } from "@/lib/text-mapper";

interface TextProps {
  label?: string;
  variant?: TextVariant;
  children?: React.ReactNode;
  className?: string; 
  id?: string;
}

export function Text({ label, variant = "def", children, className = "", ...props }: TextProps) {
  // Try to find the variant, fallback to 'def', then fallback to 'sidebar' if 'def' is missing
  const config = textMapper[variant] || textMapper.def || textMapper.sidebar;
  
  const Component = config.as;

  return (
    <Component 
      {...props}
      className={`${config.className} ${className}`}
    >
      {label || children}
    </Component>
  );
}