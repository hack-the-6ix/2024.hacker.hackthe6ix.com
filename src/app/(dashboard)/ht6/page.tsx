import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Flex from '@/components/Flex';
import Textarea from '@/components/Textarea';
import { Form } from './client';
import styles from './page.module.scss';

async function HT6Page() {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  return (
    <Form readonly={profile.status.applied}>
      <div data-grid>
        <Textarea
          label="What would you like to accomplish at Hack the 6ix?"
          status={{
            type: 'session',
            key: 'whyHT6Essay',
          }}
          data-full
          inputProps={{
            rows: 6,
            required: true,
            name: 'whyHT6Essay',
            defaultValue: profile.hackerApplication?.whyHT6Essay,
            readOnly: profile.status.applied,
          }}
          limit={200}
        />
        <Textarea
          label="If you lived in a world where you could create anything, not restricted by money, time, or techical knowledge, what would you build and why?"
          status={{
            type: 'session',
            key: 'creativeResponseEssay',
          }}
          data-full
          inputProps={{
            rows: 6,
            required: true,
            name: 'creativeResponseEssay',
            defaultValue: profile.hackerApplication?.creativeResponseEssay,
            readOnly: profile.status.applied,
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
            status={{
              type: 'session',
              key: 'mlhCOC',
            }}
            inputProps={{
              readOnly: profile.status.applied,
              required: true,
              name: 'mlhCOC',
              defaultChecked: profile.hackerApplication?.mlhCOC,
            }}
          />
          <Checkbox
            label="I authorize MLH to send me pre- and post-event informational emails, which contain free credit and opportunities from their partners."
            inputProps={{
              readOnly: profile.status.applied,
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
            status={{
              type: 'session',
              key: 'mlhData',
            }}
            inputProps={{
              readOnly: profile.status.applied,
              name: 'mlhData',
              defaultChecked: profile.hackerApplication?.mlhData,
              required: true,
            }}
          />
        </Flex>
      </div>
    </Form>
  );
}

export default HT6Page;
