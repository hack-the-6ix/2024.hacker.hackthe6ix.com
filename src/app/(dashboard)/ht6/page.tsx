import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Textarea from '@/components/Textarea';
import { FormPage } from '../client';
import { submitApplication } from './actions';
import { Checklist, SubmitApplication } from './client';
import styles from './page.module.scss';

async function HT6Page() {
  const [{ message: profile }, { message: enums }] = await Promise.all([
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>('/api/action/profile'),
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.ApplicationEnums>>(
      '/api/action/applicationEnums',
    ),
  ]);

  const workshops = profile.hackerApplication?.requestedWorkshops.split(', ');

  return (
    <FormPage
      heading="At HT6"
      onBack={{
        children: (
          <Flex as="span" align="center" gap="x-sm">
            <Icon size="xs" icon="arrow_back" />
            <span>Back</span>
          </Flex>
        ),
        href: '/experiences',
      }}
      action={submitApplication}
      noValidate
      onNext={<SubmitApplication />}
    >
      <div data-grid>
        <Checklist
          label="Please choose 3 workshops that you are interested in."
          name="requestedWorkshops"
          initialValue={workshops}
          options={enums.requestedWorkshops.map((v) => ({
            label: v,
            value: v,
          }))}
          required
        />
      </div>
      <div data-grid>
        <Textarea
          label="What would you like to accomplish at Hack the 6ix?"
          data-full
          inputProps={{
            rows: 6,
            required: true,
            name: 'whyHT6Essay',
            defaultValue: profile.hackerApplication?.whyHT6Essay,
          }}
          limit={200}
        />
        <Textarea
          label="If you lived in a world where you could create anything, not restricted by money, time, or techical knowledge, what would you build and why?"
          data-full
          inputProps={{
            rows: 6,
            required: true,
            name: 'creativeResponseEssay',
            defaultValue: profile.hackerApplication?.creativeResponseEssay,
          }}
          limit={200}
        />
      </div>
      <div data-grid>
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
                  href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                  as="a"
                >
                  Major League Hacking (MLH) Code of Conduct.
                </Button>
              </>
            }
            inputProps={{
              required: true,
              name: 'mlhCOC',
              defaultChecked: profile.hackerApplication?.mlhCOC,
            }}
          />
          <Checkbox
            label="I authorize MLH to send me pre- and post-event informational emails, which contain free credit and opportunities from their partners."
            inputProps={{
              name: 'mlhEmail',
              defaultChecked: profile.hackerApplication?.mlhEmail,
            }}
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
                  href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
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
                  href="https://mlh.io/privacy"
                  as="a"
                >
                  MLH Privacy Policy
                </Button>
                .
              </>
            }
            inputProps={{
              name: 'mlhData',
              defaultChecked: profile.hackerApplication?.mlhData,
            }}
          />
        </Flex>
      </div>
    </FormPage>
  );
}

export default HT6Page;
