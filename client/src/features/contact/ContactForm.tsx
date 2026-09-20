import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { useSubmitContact } from './useSubmitContact';
import { contactSchema, type ContactFormData } from './schema';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const mutation = useSubmitContact();

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <fieldset disabled={mutation.isPending} className="space-y-5">
        <legend className="sr-only">Contact details</legend>

        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
          autoComplete="name"
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          autoComplete="email"
        />

        <input
          {...register('company')}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <Input
          label="Subject"
          {...register('subject')}
          error={errors.subject?.message}
        />
        <Textarea
          label="Message"
          rows={6}
          {...register('message')}
          error={errors.message?.message}
        />

        <Button type="submit" isLoading={mutation.isPending}>
          {mutation.isPending ? 'Sending…' : 'Send message'}
        </Button>
      </fieldset>

      {mutation.isError && (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
      {mutation.isSuccess && (
        <p role="status" className="text-sm text-emerald-600">
          Thanks — I'll be in touch shortly.
        </p>
      )}
    </form>
  );
}
