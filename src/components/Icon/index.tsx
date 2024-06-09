import { IconType } from 'react-icons';
import cn from 'classnames';
import styles from './Icon.module.scss';

export type IconProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon: IconType | string;
  className?: string;
};

function Icon({ icon: Icon, size = 'sm', ...props }: IconProps) {
  if (typeof Icon === 'string') {
    return (
      <span
        {...props}
        className={cn(
          styles['material-symbols-rounded'],
          styles[`size--${size}`],
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
