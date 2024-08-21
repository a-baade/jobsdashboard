import { Loader } from "lucide-react";
import { Button } from "./ui/button";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  const bgColorClass = loading ? "bg-custom-secondary text-black/80" : "";

  return (
    <Button
      {...props}
      disabled={props.disabled || loading}
      className={` ${bgColorClass}`}
    >
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader size={16} className="motion-safe:animate-spin" />}
        {children}
      </span>
    </Button>
  );
}
