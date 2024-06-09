import { ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';
import InputLike, { InputLikePublicProps } from '../InputLike';
import Text from '../Text';
import styles from './Textarea.module.scss';

export type TextareaProps = InputLikePublicProps & {
  inputProps: ComponentPropsWithoutRef<'textarea'>;
};

function Textarea({ inputProps, ...props }: TextareaProps) {
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
          as="textarea"
        />
      )}
    </InputLike>
  );
}

export default Textarea;
