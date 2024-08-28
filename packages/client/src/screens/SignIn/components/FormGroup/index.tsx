import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

import { FormValues } from '../../types';

type FormGroupProps = {
  id: Path<FormValues>;
  label: string;
  register: UseFormRegister<FormValues>;
  type: 'text' | 'password';
  errors: FieldErrors<FormValues>;
};
export default function FormGroup({
  id,
  label,
  register,
  type,
  errors,
}: FormGroupProps) {
  const error = errors[id]?.message;
  return (
    <div className="mb-8 flex flex-col gap-y-2">
      <label htmlFor={id} className="font-semibold text-text-weak">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        className="rounded-3xl border border-ducky-weak px-4 py-3 leading-[27px] text-text-neutral shadow-input"
        data-testid={id + '-input'}
      />
      {error ? (
        <div
          className="self-start rounded bg-ducky-danger p-1 text-sm text-text-danger"
          data-testid={`${id}-error-message`}
        >
          {String(error)}
        </div>
      ) : null}
    </div>
  );
}
