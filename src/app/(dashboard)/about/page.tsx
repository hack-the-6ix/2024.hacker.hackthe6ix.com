import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { FormPage } from '../client';

function AboutPage() {
  return (
    <FormPage
      heading="About You"
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
      <Input
        label="First name"
        inputProps={{
          placeholder: 'First name',
          autoComplete: 'given-name',
          required: true,
          name: 'firstName',
        }}
      />
      <Input
        label="Last name"
        inputProps={{
          placeholder: 'Last name',
          autoComplete: 'family-name',
          required: true,
          name: 'lastName',
        }}
      />
      <Input
        label="Email"
        inputProps={{
          placeholder: 'hacker@hackthe6ix.com',
          autoComplete: 'email',
          required: true,
          name: 'email',
          type: 'email',
        }}
      />
      <Checkbox
        label="I give permission to Hack the 6ix for sending me emails containing information from the event sponsors."
        inputProps={{
          required: true,
          name: 'can-email',
        }}
        data-full
      />
      <Dropdown
        label="Gender"
        inputProps={{
          autoComplete: 'sex',
          required: true,
          name: 'gender',
        }}
        options={[
          {
            label: 'Placeholder',
            value: 'placeholder',
          },
        ]}
      />
      <Dropdown
        label="Ethnicity"
        inputProps={{
          required: true,
          name: 'ethnicity',
        }}
        options={[
          {
            label: 'Placeholder',
            value: 'placeholder',
          },
        ]}
      />
      <Dropdown
        label="City"
        inputProps={{
          required: true,
          name: 'city',
        }}
        options={[
          {
            label: 'Placeholder',
            value: 'placeholder',
          },
        ]}
      />
      <Dropdown
        label="Province"
        inputProps={{
          required: true,
          name: 'province',
        }}
        options={[
          {
            label: 'Placeholder',
            value: 'placeholder',
          },
        ]}
      />
    </FormPage>
  );
}

export default AboutPage;
