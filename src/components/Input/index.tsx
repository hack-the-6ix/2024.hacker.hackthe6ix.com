import { ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';
import InputLike, { InputLikePublicProps } from '../InputLike';
import Text from '../Text';
import styles from './Input.module.scss';

export type InputProps = InputLikePublicProps & {
  inputProps: ComponentPropsWithoutRef<'input'>;
};

function Input({ inputProps, ...props }: InputProps) {
  return (
    <InputLike
      {...props}
      disabled={inputProps.disabled}
      required={inputProps.required}
    >
      {(ariaProps) => (
        <Text
          {...inputProps}
          {...ariaProps}
          className={cn(
            inputProps['aria-invalid'] && styles.error,
            styles.input,
          )}
          textColor="neutral-900"
          textType="paragraph-sm"
          as="input"
        />
      )}
    </InputLike>
  );
}

export default Input;
