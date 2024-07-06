import { CSSProperties } from 'react';
import cn from 'classnames';
import forwardRefAs from 'forward-ref-as';
import { ColorLevels, ColorTypes } from '@/styles';
import Flex from '../Flex';
import Icon from '../Icon';
import Text from '../Text';
import styles from './Button.module.scss';

export type ButtonProps = {
  buttonType?: 'primary' | 'secondary' | 'tertiary';
  buttonColor?: ColorTypes;
  buttonLevel?: ColorLevels;
  loading?: boolean | string;
};

const Button = forwardRefAs<'button', ButtonProps>(
  (
    {
      buttonColor = 'neutral',
      buttonType = 'primary',
      buttonLevel = 500,
      loading,
      as,
      ...props
    },
    ref,
  ) => {
    return (
      <Text
        textType="paragraph-sm"
        textWeight="semi-bold"
        textAlign="center"
        as={as ?? 'button'}
        type="button"
        {...props}
        className={cn(
          props.disabled && styles.disabled,
          styles[`type--${buttonType}`],
          loading && styles.loading,
          styles.button,
          props.className,
        )}
        style={
          props.disabled || loading ?
            props.style
          : ({
              '--button-color': `var(--${buttonColor}-${buttonLevel})`,
              '--button-color-hover': `var(--${buttonColor}-${buttonLevel + 200})`,
              '--button-color-active': `var(--${buttonColor}-${buttonLevel + 300})`,
              ...props.style,
            } as CSSProperties)
        }
        ref={ref}
      >
        {loading ?
          <Flex align="center" gap="sm">
            <Icon className={styles.loader} icon="progress_activity" />
            <span>{typeof loading === 'string' ? loading : 'Loading...'}</span>
          </Flex>
        : props.children}
      </Text>
    );
  },
);

export default Button;
