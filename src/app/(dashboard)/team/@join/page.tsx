import Button from '@/components/Button';
import Input from '@/components/Input';
import { TeamLayout } from '../components';
import styles from './page.module.scss';

function JoinTeam() {
  return (
    <TeamLayout
      label="Join a Team"
      description="Already have a team code? Enter it below!"
      rightAction={{
        children: 'Skip to my application',
      }}
    >
      <form className={styles.content}>
        <Input
          label="Team code"
          inputProps={{ required: true, placeholder: 'OWO123' }}
        />
        <Button>Join team</Button>
      </form>
    </TeamLayout>
  );
}

export default JoinTeam;
