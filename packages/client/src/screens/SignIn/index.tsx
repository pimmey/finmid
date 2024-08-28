import Spinner from '~/components/Spinner';
import FormGroup from '~/screens/SignIn/components/FormGroup';
import useLoginForm from '~/screens/SignIn/hooks/use-login-form';

import { FIELDS } from './config';

export default function SignIn() {
  const { handleSubmit, onSubmit, register, errors, isPending } =
    useLoginForm();
  return (
    <div className="flex min-h-screen items-center">
      <div className="container mx-auto px-4">
        <form
          className="bg-brand flex flex-col gap-y-16 rounded-3xl p-8 md:mx-auto md:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-4xl">Welcome back!</div>
          <div className="flex flex-col">
            {FIELDS.map(field => (
              <FormGroup
                key={field.id}
                register={register}
                errors={errors}
                {...field}
              />
            ))}
            <button
              type="submit"
              className="self-end rounded-3xl bg-black px-4 py-2 text-white"
              disabled={isPending}
              data-testid="sign-in-button"
            >
              {isPending ? <Spinner /> : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="flex justify-center py-8">
          <img src="/logo.png" alt="Logo" className="h-12 w-12" />
        </div>
      </div>
    </div>
  );
}
