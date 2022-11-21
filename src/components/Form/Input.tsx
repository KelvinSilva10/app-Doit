import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
  InputProps,
  Text,
} from '@chakra-ui/react';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';

interface iInputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: any;
  icon?: IconType;
}

type iInputVariationOptions = {
  [key: string]: string;
};

const inputVariation: iInputVariationOptions = {
  error: 'red.500',
  default: 'gray.200',
  focus: 'purple.800',
  filled: 'green.500',
};

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  iInputProps
> = ({ name, error = null, label, icon: Icon, ...rest }, ref) => {
  const [variation, setVariation] = useState('default');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (error) {
      setVariation('error');
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation('focus');
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      setVariation('filled');
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel color='gray.400'>{label}</FormLabel>}

      <InputGroup flexDirection='column'>
        {Icon && (
          <InputLeftElement color={inputVariation[variation]} mt='2.5'>
            <Icon />
          </InputLeftElement>
        )}

        <ChakraInput
          name={name}
          bg='gray.50'
          textColor={inputVariation[variation]}
          borderColor={inputVariation[variation]}
          onFocus={handleInputFocus}
          onBlurCapture={handleInputBlur}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          variant='outline'
          _hover={{ bgColor: 'gray.100' }}
          _placeholder={{ color: 'gray.300' }}
          _focus={{ bg: 'gray.100' }}
          size='lg'
          h='60px'
          ref={ref}
          {...rest}
        />
        {!!error && (
          <FormErrorMessage color='red.500'>{error.message}</FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
