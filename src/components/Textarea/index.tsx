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
  const [wordNum, setWordNum] = useState(0);
  const [text, setText] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText((oldText) => {
      const words = e.target.value.trim().split(/\s+/); // array of words
      const wordCount = words.length;
      console.log(wordCount);

      if (wordCount <= limit) {
        setWordNum(wordCount);
        return e.target.value;
      }

      const truncatedWords = words.slice(0, limit).join(' ');
      setWordNum(limit);
      return truncatedWords;
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
        <Text textColor={wordNum <= 200 ? 'secondary-700' : 'error-400'}>
          {wordNum}
        </Text>
        /{limit} words
      </Text>
    </>
  );
}

export default Textarea;
