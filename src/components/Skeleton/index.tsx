import { CSSProperties } from 'react';
import cn from 'classnames';
import { Colors, Spacing } from '@/styles';
import styles from './Skeleton.module.scss';

export type SkeletonProp = {
  color?: Colors;
  height?: number;
  width?: number;
  ratio?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
};

function Skeleton({
  color = 'neutral-400',
  height,
  fullWidth,
  fullHeight,
  width,
  ratio,
}: SkeletonProp) {
  return (
    <div
      style={
        {
          '--skeleton-h':
            height ?? (width && ratio ? width / ratio : undefined),
          '--skeleton-w':
            width ?? (height && ratio ? height * ratio : undefined),
          '--skeleton-b': color,
        } as CSSProperties
      }
      className={cn(
        styles.loader,
        fullWidth && styles.fullWidth,
        fullHeight && styles.fullHeight,
      )}
    />
  );
}

export default Skeleton;
