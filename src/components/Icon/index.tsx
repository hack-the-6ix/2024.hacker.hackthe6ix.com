import { CSSProperties } from 'react';
import { IconType } from 'react-icons';
import cn from 'classnames';
import { Colors } from '@/styles';
import styles from './Icon.module.scss';

export type IconProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: Colors;
  icon: IconType | string;
  className?: string;
};

function Icon({ icon: Icon, color, size = 'sm', ...props }: IconProps) {
  if (typeof Icon === 'string') {
    return (
      <span
        {...props}
        style={
          {
            '--icon-color': color ? `var(--${color})` : null,
          } as CSSProperties
        }
        className={cn(
          styles['material-symbols-rounded'],
          styles[`size--${size}`],
          styles.icon,
          props.className,
        )}
        aria-hidden
      >
        {Icon}
      </span>
    );
  } else {
    return (
      <Icon
        className={cn(styles[`size--${size}`], props.className)}
        aria-hidden
      />
    );
  }
}

export default Icon;
