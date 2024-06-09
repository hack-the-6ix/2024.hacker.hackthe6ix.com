import { FaArrowLeft } from 'react-icons/fa6';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import { FormPage } from '../client';

function TeamPage() {
  return (
    <FormPage
      heading="Team Formation"
      onBack={{
        buttonColor: 'primary',
        buttonType: 'tertiary',
        children: (
          <Flex as="span" align="center" gap="x-sm">
            <Icon size="xs" icon="arrow_back" />
            <span>Back</span>
          </Flex>
        ),
      }}
      onNext={{
        buttonColor: 'primary',
        children: 'Save & continue',
        type: 'submit',
      }}
    >
      Something
    </FormPage>
  );
}

export default TeamPage;
