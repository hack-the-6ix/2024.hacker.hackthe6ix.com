import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import styles from './client.module.scss';
import { useRef } from 'react';

import { denyRSVP, confirmRSVP } from './actions';

export function DenyRSVP() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <Button
        onClick={() => dialogRef.current?.showModal()}
        buttonColor="primary"
      >
        I can no longer attend
      </Button>
      <dialog className={styles.dialog} ref={dialogRef}>
          <Flex direction="column" align="center" gap="3x-big">
            <Flex direction="column" align="center" gap="m">
              <Text
                textWeight="bold"
                textColor="warning-500"
                textType="subtitle-lg"
                textAlign="center"
                as="h2"
              >
                Submit application?
              </Text>
              <Text
                textAlign="center"
                textColor="secondary-700"
                textType="paragraph-lg"
                as="p"
              >
                Once you submit this application, you{' '}
                <Text textColor="error-600" textWeight="bold">
                  cannot make
                </Text>{' '}
                any changes.
              </Text>
              <Text
                textAlign="center"
                textColor="secondary-700"
                textType="paragraph-lg"
                as="p"
              >
                Please review your answers to ensure they are accurate.
              </Text>
            </Flex>
            <Flex
              className={styles.dialogFooter}
              justify="center"
              align="center"
              gap="x-sm"
            >
              <Button onClick={close} buttonType="secondary">
                Cancel
              </Button>
              <Button
                buttonColor="primary"
                onClick={denyRSVP}
              >
                Submit
              </Button>
            </Flex>
          </Flex>
      </dialog>
    </>
  );
}
