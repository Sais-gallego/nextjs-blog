interface FormFieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
}

export default function FormField({
  label,
  name,
  type = "text",
  required,
}: FormFieldProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label}
        <input
          type={type}
          name={name}
          required={required}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </label>
    </div>
  )
}
