interface FormFieldProps {
  label: string;
  name: string;
  children: React.ReactNode;
}

export function FormField({ label, name, children }: FormFieldProps) {
  return (
    <label htmlFor={name}>
      <span>{label}</span>
      {children}
    </label>
  );
}
