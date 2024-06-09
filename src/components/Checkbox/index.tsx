import { ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';
import Flex from '../Flex';
import Icon from '../Icon';
import InputLike, { InputLikePublicProps } from '../InputLike';
import styles from './Checkbox.module.scss';

export interface CheckboxProps
  extends Omit<InputLikePublicProps, 'description'> {
  inputProps: ComponentPropsWithoutRef<'input'>;
}

function Checkbox({ inputProps, ...props }: CheckboxProps) {
  return (
    <InputLike
      {...props}
      className={cn(props.className, styles.container)}
      disabled={inputProps.disabled}
      required={inputProps.required}
    >
      {(ariaProps) => (
        <Flex justify="center" align="center" className={styles.content}>
          <input
            {...inputProps}
            {...ariaProps}
            className={cn(inputProps.className, styles.input)}
            type="checkbox"
          />
          <Icon className={styles.check} icon="check" />
        </Flex>
      )}
    </InputLike>
  );
}

export default Checkbox;
