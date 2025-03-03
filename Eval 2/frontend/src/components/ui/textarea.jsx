export function Textarea({ placeholder, className, rows = 5, ...props }) {
    return (
      <textarea
        className={`border rounded-md p-2 w-full ${className}`}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
    );
  }
  