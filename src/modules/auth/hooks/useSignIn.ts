import storageKeys from '@/constants/storageKeys';
import useForm from '@/hooks/useForm';
import { setGlobalAccessToken } from '@/services';
import storage from '@/utils/storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from './useAuthMutation';

const useSignIn = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  const { mutateAsync: loginMutation, isPending } = useLoginMutation();

  const { errors, onChangeField, submit } = useForm(
    {
      email: {
        validator: (text: string) => {
          //   const isValid = validateEmail(text);
          //   if (!isValid) {
          //     return 'Please enter a valid email address';
          //   }
          return null;
        },
      },
      password: {
        notEmpty: true,
        minLength: 6,
      },
    },
    async (values) => {
      setMessage('');

      try {
        const result = await loginMutation({
          username: values.email,
          password: values.password,
        });

        if (result) {
          const { access_token, refresh_token } = result;

          if (access_token && refresh_token) {
            setGlobalAccessToken(access_token);

            // Store tokens securely
            await storage.setSecureItem(storageKeys.ACCESS_TOKEN, access_token);
            await storage.setSecureItem(
              storageKeys.REFRESH_TOKEN,
              refresh_token
            );

            // Navigate to main app after successful login
            console.log('Login successful, navigating to main app');
            // navigation.navigate('MainApp' as never);
          } else {
            setMessage('Login failed. Invalid response from server.');
          }
        } else {
          setMessage('Login failed. Please try again.');
        }
      } catch {
        setMessage('Login failed. Please try again.');
      }
    }
  );

  return {
    navigation,
    errors,
    message,
    setMessage,
    onChangeField,
    submit,
    t,
    isLoading: isPending,
  };
};

export default useSignIn;
