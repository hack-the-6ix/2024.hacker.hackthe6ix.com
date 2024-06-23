import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Textarea from '@/components/Textarea';
import { FormPage } from '../client';
import { Checklist } from './client';
import styles from './page.module.scss';

function HT6Page() {
  return (
    <FormPage
      heading="At HT6"
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
      <Checklist
        label="Please choose 3 workshops that you are interested in."
        name="workshops"
        options={[
          {
            label: 'Basics of Python',
            value: 'basics_of_python',
          },
        ]}
        required
      />
      <Textarea
        label="What would you like to accomplish at Hack the 6ix?"
        data-full
        inputProps={{
          rows: 6,
          required: true,
        }}
      />
      <Textarea
        label="What is one project you were proud of? What tools and methods did you use to complete it?"
        data-full
        inputProps={{
          rows: 6,
          required: true,
        }}
      />
      <Flex direction="column" gap="sm" data-full>
        <Checkbox
          label={
            <>
              I have read and agree to the{' '}
              <Button
                className={styles.link}
                rel="noreferrer noopener"
                buttonType="tertiary"
                buttonColor="warning"
                target="_blank"
                href="#"
                as="a"
              >
                Major League Hacking (MLH) Code of Conduct.
              </Button>
            </>
          }
          inputProps={{
            required: true,
          }}
        />
        <Checkbox
          label="I authorize MLH to send me pre- and post-event informational emails, which contain free credit and opportunities from their partners."
          inputProps={{}}
        />
        <Checkbox
          label={
            <>
              I authorize Hack the 6ix to share my application/registration
              information with Major League Hacking for event administration,
              ranking, and MLH administration in-line with the MLH Privacy
              Policy. I further agree to the terms of both the{' '}
              <Button
                className={styles.link}
                rel="noreferrer noopener"
                buttonType="tertiary"
                buttonColor="warning"
                target="_blank"
                href="#"
                as="a"
              >
                MLH Contest Terms and Conditions
              </Button>{' '}
              and the{' '}
              <Button
                className={styles.link}
                rel="noreferrer noopener"
                buttonType="tertiary"
                buttonColor="warning"
                target="_blank"
                href="#"
                as="a"
              >
                MLH Privacy Policy
              </Button>
              .
            </>
          }
          inputProps={{}}
        />
      </Flex>
    </FormPage>
  );
}

export default HT6Page;
