'use client';

import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import cn from 'classnames';
import * as R from 'ramda';
import Button from '../Button';
import Flex from '../Flex';
import Icon from '../Icon';
import InputLike, { InputLikePublicProps } from '../InputLike';
import Text from '../Text';
import styles from './FileUpload.module.scss';

export type FileUploadProps = InputLikePublicProps & {
  inputProps: Omit<ComponentPropsWithoutRef<'input'>, 'value'> & {
    value: File;
  };
};

function FileUpload({ inputProps, ...props }: FileUploadProps) {
  const [file, _setFile] = useState<File | null>(null);
  const previewUrl = useRef<string>();
  const input = useRef<HTMLInputElement>(null);

  const setFile = useCallback((file: File | null) => {
    URL.revokeObjectURL(previewUrl.current ?? '');
    if (file) previewUrl.current = URL.createObjectURL(file);
    _setFile(file);
  }, []);

  useEffect(() => {
    if (!input.current || !inputProps.value) return;
    const transfer = new DataTransfer();
    transfer.items.add(inputProps.value);
    input.current.files = transfer.files;
    setFile(inputProps.value ?? null);
  }, [setFile, inputProps.value]);

  return (
    <InputLike
      {...props}
      disabled={inputProps.disabled}
      required={inputProps.required}
    >
      {(ariaProps) => (
        <Flex className={styles.frame} align="center" gap="x-big">
          <input
            {...R.omit(['value'], inputProps)}
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
            <Flex direction="column">
              <Text
                textColor="secondary-700"
                textType="paragraph-sm"
                textWeight="semi-bold"
                as="p"
              >
                File uploaded
              </Text>
              <Button
                className={cn(styles.preview, 'font--label')}
                buttonColor="warning"
                buttonType="tertiary"
                href={previewUrl.current}
                target="_blank"
                as="a"
              >
                <span>Preview File</span>
                <Icon icon="open_in_new" size="xs" />
              </Button>
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
