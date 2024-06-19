import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { FormPage } from '../client';

function ExperiencesPage() {
  return (
    <FormPage
      heading="Your Experiences"
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
      <Dropdown
        label="Your School (Most Recently Attended)"
        inputProps={{
          required: true,
          name: 'school',
        }}
        options={[
          {
            label: 'Placeholder',
            value: 'placeholder',
          },
        ]}
      />
      <Dropdown
        label="Your Program of Study"
        inputProps={{
          required: true,
          name: 'program',
        }}
        options={[
          {
            label: 'Placeholder',
            value: 'placeholder',
          },
        ]}
      />
      <Dropdown
        label="Year of Study"
        inputProps={{
          required: true,
          name: 'year',
        }}
        options={[
          {
            label: 'Placeholder',
            value: 'placeholder',
          },
        ]}
      />
      <Dropdown
        label="Number of Hackathons Attended"
        inputProps={{
          required: true,
          name: 'hacakthons',
        }}
        options={[
          {
            label: 'Placeholder',
            value: 'placeholder',
          },
        ]}
      />
      <Checkbox
        label="I allow Hack the 6ix to distribute my resume to its event sponsors."
        inputProps={{
          name: 'can-share',
        }}
        data-full
      />
      <Input
        label="GitHub"
        inputProps={{
          placeholder: 'ex: https://domain1.com/projects',
          name: 'github',
          type: 'link',
        }}
        data-start
      />
      <Input
        label="Link to Portfolio"
        inputProps={{
          placeholder: 'ex: https://johndoe.com',
          name: 'portoflio',
          type: 'link',
        }}
        data-start
      />
      <Input
        label="LinkedIn"
        inputProps={{
          placeholder: 'ex: https://linkedin.com/in/johndoe',
          name: 'linkedin',
          type: 'link',
        }}
        data-start
      />
    </FormPage>
  );
}

export default ExperiencesPage;
