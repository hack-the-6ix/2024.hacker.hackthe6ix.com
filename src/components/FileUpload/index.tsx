'use client';

import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import * as R from 'ramda';
import Flex from '../Flex';
import Icon from '../Icon';
import InputLike, { InputLikePublicProps } from '../InputLike';
import Text from '../Text';
import styles from './FileUpload.module.scss';

export type FileUploadProps = InputLikePublicProps & {
  inputProps: Omit<
    ComponentPropsWithoutRef<'input'>,
    'value' | 'defaultValue'
  > & {
    defaultValue?: File;
    value?: File;
  };
};

function FileUpload({ inputProps, ...props }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(
    inputProps.defaultValue ?? null,
  );
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!input.current || !inputProps.value) return;
    const transfer = new DataTransfer();
    transfer.items.add(inputProps.value);
    input.current.files = transfer.files;
    setFile(inputProps.value ?? null);
  }, [inputProps.value]);

  return (
    <InputLike
      {...props}
      disabled={inputProps.disabled}
      required={inputProps.required}
    >
      {(ariaProps) => (
        <Flex className={styles.frame} align="center" gap="x-big">
          <input
            {...R.omit(['value', 'defaultValue'], inputProps)}
            {...ariaProps}
            onChange={(...args) => {
              setFile(args[0].currentTarget.files?.[0] ?? null);
              inputProps.onChange?.(...args);
            }}
            className={cn(styles.input, inputProps.className)}
            ref={input}
            type="file"
          />
          <Icon
            size="lg"
            color="primary-500"
            icon={file ? 'upload_file' : 'task'}
          />
          {file ?
            <Flex className={styles.uploaded} direction="column">
              <Text
                textColor="secondary-700"
                textType="paragraph-sm"
                textWeight="semi-bold"
                as="p"
              >
                File uploaded
              </Text>
              <Text
                className={styles.name}
                textColor="warning-500"
                textType="label"
              >
                {file.name}
              </Text>
            </Flex>
          : <Flex direction="column">
              <Text
                textColor="secondary-700"
                textType="paragraph-sm"
                textWeight="semi-bold"
                as="p"
              >
                Drop files here or <Text textColor="warning-500">Browse</Text>
              </Text>
              {inputProps.accept && (
                <Text textColor="secondary-700" textType="paragraph-sm" as="p">
                  Accepted file format: {inputProps.accept}
                </Text>
              )}
            </Flex>
          }
        </Flex>
      )}
    </InputLike>
  );
}

export default FileUpload;
