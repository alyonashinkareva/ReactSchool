export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    icon_left?: React.ReactNode;
    icon_right?: React.ReactNode;
    disabled?: boolean;
    className?: string;
  }