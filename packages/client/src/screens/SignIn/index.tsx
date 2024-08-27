import FormGroup from '~/screens/SignIn/components/FormGroup';
import useLoginForm from '~/screens/SignIn/hooks/use-login-form';

import { FIELDS } from './config';

export default function SignIn() {
  const { handleSubmit, onSubmit, register, errors } = useLoginForm();

  return (
    <div>
      Sign in
      <form className="bg-gray-100" onSubmit={handleSubmit(onSubmit)}>
        {FIELDS.map(field => (
          <FormGroup
            key={field.id}
            register={register}
            errors={errors}
            {...field}
          />
        ))}
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
