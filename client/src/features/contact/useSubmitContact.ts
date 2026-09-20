import { useMutation } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { ContactFormData } from './schema';

export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: ContactFormData) => api.contact.submit(data),
  });
}
