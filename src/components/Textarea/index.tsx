'use client';

import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react';
import cn from 'classnames';
import InputLike, { InputLikePublicProps } from '../InputLike';
import Text from '../Text';
import styles from './Textarea.module.scss';

export type TextareaProps = InputLikePublicProps & {
  inputProps: ComponentPropsWithoutRef<'textarea'>;
  limit?: number;
};

function Textarea({ limit = 50, inputProps, ...props }: TextareaProps) {
  const [text, setText] = useState<string>(
    inputProps.defaultValue?.toString() ?? '',
  );
  const words = text.trim().split(/\s+/);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText((oldText) => {
      const text = e.currentTarget.value;
      const words = text.trim().split(/\s+/); // array of words
      return words.length <= limit ? text : oldText;
    });
  };

  return (
    <>
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
            as="textarea"
            value={text}
            onChange={handleOnChange}
          />
        )}
      </InputLike>
      <Text
        className={styles.wordCount}
        textColor="secondary-700"
        textType="label"
        textWeight="medium"
        as="legend"
      >
        <Text textColor={words.length <= 200 ? 'secondary-700' : 'error-400'}>
          {words.length}
        </Text>
        /{limit} words
      </Text>
    </>
  );
}

export default Textarea;
