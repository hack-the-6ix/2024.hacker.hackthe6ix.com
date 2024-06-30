import { ComponentPropsWithoutRef } from 'react';
import { IconType } from 'react-icons';
import cn from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import styles from './IconButton.module.scss';

export type IconButtonProps = Omit<
  ComponentPropsWithoutRef<typeof Button>,
  'children'
> & {
  icon: string | IconType;
};

function IconButton({ icon, as, ...props }: IconButtonProps) {
  return (
    <Button
      {...props}
      className={cn(styles.button, props.className)}
      as={as ?? 'button'}
    >
      <Icon icon={icon} />
    </Button>
  );
}

export default IconButton;
