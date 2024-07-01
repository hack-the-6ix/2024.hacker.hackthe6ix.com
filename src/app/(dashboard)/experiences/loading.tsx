import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './loading.module.scss';

function FormLoading() {
  return (
    <Flex
      className={styles.container}
      direction="column"
      gap="m"
      justify="center"
      align="center"
    >
      <Icon className={styles.icon} color="neutral-300" icon="sync" />
      <Text textType="subtitle-lg" textColor="neutral-300">
        Loaidng application...
      </Text>
    </Flex>
  );
}

export default FormLoading;
