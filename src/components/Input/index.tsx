'use client';

import { ComponentPropsWithoutRef } from 'react';
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
          className={styles.input}
          textColor="neutral-900"
          textType="paragraph-sm"
          as="input"
        />
      )}
    </InputLike>
  );
}

export default Input;
