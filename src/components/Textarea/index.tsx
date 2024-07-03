'use client';

import { ComponentPropsWithoutRef, useState } from 'react';
import * as R from 'ramda';
import Flex from '../Flex';
import InputLike, { InputLikePublicProps } from '../InputLike';
import Text from '../Text';
import styles from './Textarea.module.scss';

export type TextareaProps = InputLikePublicProps & {
  inputProps: ComponentPropsWithoutRef<'textarea'>;
  limit?: number;
};

const countWords = (str: string) =>
  str.trim().split(/\s+/).filter(Boolean).length;

function Textarea({ limit = 50, inputProps, ...props }: TextareaProps) {
  const [text, setText] = useState<string>(
    inputProps.defaultValue?.toString() ?? '',
  );
  const words = countWords(text);

  return (
    <InputLike
      {...props}
      disabled={inputProps.disabled}
      required={inputProps.required}
      description={
        <Flex justify="flex-end" as={Text}>
          {words}/{limit} words
        </Flex>
      }
    >
      {(ariaProps) => (
        <Text
          {...R.omit(['defaultValue'], inputProps)}
          {...ariaProps}
          className={styles.input}
          textColor="neutral-900"
          textType="paragraph-sm"
          as="textarea"
          value={text}
          onChange={(e) => {
            let text = e.target.value;
            const words = countWords(text);
            if (words === limit) text = text.trim();
            setText((oldText) => (words <= limit ? text : oldText));
          }}
        />
      )}
    </InputLike>
  );
}

export default Textarea;
