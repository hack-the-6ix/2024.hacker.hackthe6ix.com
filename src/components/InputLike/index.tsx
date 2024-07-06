'use client';

import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useId,
  useState,
} from 'react';
import cn from 'classnames';
import Flex from '../Flex';
import Text from '../Text';

// Used for extending by inputs
export type InputLikePublicProps = {
  label: ReactNode;
  hideLabel?: boolean;
  description?: ReactNode;
  status?:
    | {
        type: 'implicit';
        msg?: ReactNode;
      }
    | {
        type: 'session';
        key: string;
      };
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export type InputLikeProps = InputLikePublicProps & {
  disabled?: boolean;
  required?: boolean;
  children?: (props: AriaProps) => ReactNode;
  hideStatus?: boolean;
};

type AriaProps = {
  'aria-errormessage'?: string;
  'aria-describedby'?: string;
  'aria-invalid': boolean;
  'aria-disabled'?: boolean;
  required?: boolean;
  disabled?: boolean;
  id: string;
};

function InputLike({
  label,
  hideLabel,
  required,
  disabled,
  description,
  hideStatus,
  status,
  children,
  ...props
}: InputLikeProps) {
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  const descriptor =
    (hideStatus ? undefined : (status as any)?.msg || error) || description;
  const hasError = !!((status as any)?.msg || error);

  useEffect(() => {
    if (status?.type !== 'session') return;
    const handler = () =>
      setError(window.sessionStorage.getItem(`errors::${status.key}`));
    window.addEventListener(`sessionStorage:update`, handler);
    handler();

    return () => window.removeEventListener(`sessionStorage:update`, handler);
  }, [status]);

  return (
    <Flex direction="column" gap="2x-sm" {...props} inline>
      <Text
        htmlFor={id}
        className={cn(hideLabel && 'hidden')}
        textColor={disabled ? 'neutral-200' : 'secondary-700'}
        textType="paragraph-sm"
        textWeight="semi-bold"
        as="label"
      >
        <span>{label}</span>
        {required && (
          <Text textColor={disabled ? 'neutral-200' : 'error-500'} aria-hidden>
            *
          </Text>
        )}
      </Text>
      {children?.({
        [hasError ? 'aria-errormessage' : 'aria-describedby']: `${id}--text`,
        'aria-invalid': hasError,
        'aria-disabled': disabled,
        required,
        disabled,
        id,
      })}
      {descriptor && (
        <Text
          textColor={
            disabled ? 'neutral-400'
            : hasError ?
              'error-500'
            : 'secondary-900'
          }
          id={`${id}--text`}
          textType="label"
          textWeight="medium"
        >
          {descriptor}
        </Text>
      )}
    </Flex>
  );
}

export default InputLike;
