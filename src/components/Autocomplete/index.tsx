'use client';

import {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Fuse from 'fuse.js/basic';
import * as R from 'ramda';
import Flex from '../Flex';
import InputLike, { InputLikePublicProps } from '../InputLike';
import Text from '../Text';
import styles from './Autocomplete.module.scss';

export interface AutocompleteProps extends InputLikePublicProps {
  inputProps: ComponentPropsWithoutRef<'input'>;
  options: string[];
}
function Autocomplete({ inputProps, options, ...props }: AutocompleteProps) {
  const fuse = useMemo(() => new Fuse(options), [options]);
  const ref = useRef<HTMLDivElement>(null);
  const [show, _setShow] = useState(false);
  const [value, setValue] = useState<string>(
    inputProps.defaultValue?.toString() ?? inputProps.value?.toString() ?? '',
  );
  const filteredOptions = fuse.search(value);
  const setShow = useMemo(
    () =>
      inputProps.disabled || inputProps.readOnly ?
        () => _setShow(false)
      : _setShow,
    [inputProps.disabled, inputProps.readOnly],
  );

  useEffect(() => {
    if (!show) return;
    const handler = (e: MouseEvent) => {
      if (ref.current?.contains(e.target as Node)) return;
      setShow(false);
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, [show, setShow]);

  return (
    <InputLike
      {...props}
      disabled={inputProps.disabled}
      required={inputProps.required}
    >
      {(ariaProps) => (
        <div
          ref={ref}
          onFocusCapture={() => setShow(true)}
          className={styles.frame}
        >
          <Text
            {...R.omit(['defaultValue'], inputProps)}
            {...ariaProps}
            onChange={(e) => {
              setValue(e.currentTarget.value);
              inputProps.onChange?.(e);
            }}
            className={styles.input}
            textColor="neutral-900"
            textType="paragraph-sm"
            value={value}
            as="input"
          />
          {!!filteredOptions.length && (
            <Flex
              className={styles.popup}
              direction="column"
              open={show}
              as="dialog"
            >
              {filteredOptions.slice(0, 10).map((option, idx) => (
                <Text
                  onClick={() => {
                    setValue(option.item);
                    setShow(false);
                  }}
                  textType="paragraph-sm"
                  className={styles.option}
                  type="button"
                  key={idx}
                  as="button"
                >
                  {option.item}
                </Text>
              ))}
            </Flex>
          )}
        </div>
      )}
    </InputLike>
  );
}

export default Autocomplete;
