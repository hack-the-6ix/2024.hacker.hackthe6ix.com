'use client';

import { ComponentPropsWithoutRef, ReactNode, useRef } from 'react';
import cn from 'classnames';
import * as R from 'ramda';
import { useDebounceState, useForceUpdate } from '@/utils';
import Flex from '../Flex';
import Icon from '../Icon';
import InputLike, { InputLikePublicProps } from '../InputLike';
import Text from '../Text';
import styles from './Dropdown.module.scss';

export type DropdownItem = {
  label: string;
  render?: ReactNode;
  value: string;
};

export type DropdownProps = InputLikePublicProps & {
  inputProps: ComponentPropsWithoutRef<'select'>;
  options: DropdownItem[];
};

function Dropdown({ inputProps, options, ...props }: DropdownProps) {
  const [show, setShow] = useDebounceState(false, 25);
  const inputRef = useRef<HTMLSelectElement>(null);
  const update = useForceUpdate();

  const selectedValue = inputProps.value ?? inputRef.current?.value;
  const hasActive = R.any(R.propEq(selectedValue, 'value'), options);

  return (
    <InputLike
      {...props}
      disabled={inputProps.disabled}
      required={inputProps.required}
    >
      {(ariaProps) => (
        <div
          onBlur={() => setShow(false)}
          className={cn(show && styles.active, styles.frame)}
        >
          <Text
            {...inputProps}
            {...ariaProps}
            className={cn(
              inputProps['aria-invalid'] && styles.error,
              styles.input,
            )}
            defaultValue=""
            textColor={hasActive ? 'neutral-900' : 'neutral-400'}
            textType="paragraph-sm"
            as="select"
            ref={inputRef}
          >
            <option value="" disabled hidden>
              Select an option
            </option>
            {options.map((option, idx) => (
              <option value={option.value} key={idx}>
                {option.label}
              </option>
            ))}
          </Text>
          <Icon className={styles.chevron} icon="keyboard_arrow_down" />
          <button
            className={styles.trigger}
            onClick={() => setShow(R.not)}
            type="button"
            tabIndex={-1}
            aria-hidden
          />
          <Flex
            onFocus={() => setShow(true)}
            className={styles.popup}
            direction="column"
            open={show}
            as="dialog"
          >
            {options.map((option, idx) => (
              <Text
                onClick={() => {
                  if (!inputRef.current) return;
                  inputRef.current.value = option.value;
                  inputRef.current.dispatchEvent(new Event('change'));

                  // If not controlled
                  if (!inputProps.onChange) {
                    update();
                  }
                }}
                textType="paragraph-sm"
                className={cn(
                  selectedValue === option.value && styles.active,
                  styles.option,
                )}
                value={option.value}
                type="button"
                key={idx}
                as="button"
              >
                {option.render ?? option.label}
              </Text>
            ))}
          </Flex>
        </div>
      )}
    </InputLike>
  );
}

export default Dropdown;
