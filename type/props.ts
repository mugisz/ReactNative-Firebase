import { IFormData } from "./auth";

interface AuthFooterProps {
  isLogin: boolean;
  onToggleMode: () => void;
}
interface AuthHeaderProps {
  isLogin: boolean;
}
interface AuthFormProps {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
  isLogin: boolean;
  loading: boolean;
  onSubmit: () => Promise<void>;
}

export type { AuthFooterProps, AuthFormProps, AuthHeaderProps };
