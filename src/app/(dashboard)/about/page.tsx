import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { FormPage } from '../client';

function AboutPage() {
  return (
    <FormPage
      heading="About You"
      onBack={{
        children: (
          <Flex as="span" align="center" gap="x-sm">
            <Icon size="xs" icon="arrow_back" />
            <span>Back</span>
          </Flex>
        ),
      }}
      onNext={{
        children: 'Save & continue',
      }}
    >
      <div data-grid>
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
            name: 'can-email',
          }}
          data-full
        />
      </div>
      <div data-grid>
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
        <Dropdown
          label="Country"
          inputProps={{
            required: true,
            name: 'country',
            defaultValue: 'canada',
            disabled: true,
          }}
          options={[
            {
              label: 'Canada',
              value: 'canada',
            },
          ]}
        />
        <Dropdown
          label="Shirt size"
          data-start
          inputProps={{
            required: true,
            name: 'size',
          }}
          options={[
            {
              label: 'Placeholder',
              value: 'placeholder',
            },
          ]}
        />
        <Input
          label="Please specify any dietary restrictions you have."
          data-full
          inputProps={{
            placeholder: 'ie: vegan, vegetarian',
            required: true,
            name: 'dietary',
          }}
        />
        <Input
          label="Please specify any allergies you have."
          data-full
          inputProps={{
            placeholder: 'ie: peanuts, nuts',
            required: true,
            name: 'allergies',
          }}
        />
      </div>
      <div data-grid>
        <Flex direction="column" gap="x-sm" data-full>
          <Text textColor="warning-500" textType="subtitle-sm" as="h3">
            Emergency Information
          </Text>
          <Text textColor="secondary-700" textType="paragraph-sm" as="p">
            Your safety is our priority. In the case of an emergency, this
            person will be contacted. We respect your privacy and guarantee that
            this information will be only be accessed by authorized personnel.
          </Text>
        </Flex>
        <Input
          label="First name"
          inputProps={{
            placeholder: 'First name',
            autoComplete: 'off',
            required: true,
            name: 'firstName',
          }}
        />
        <Input
          label="Last name"
          inputProps={{
            placeholder: 'Last name',
            autoComplete: 'off',
            required: true,
            name: 'lastName',
          }}
        />
        <Input
          label="Phone number"
          inputProps={{
            placeholder: '###-###-####',
            autoComplete: 'off',
            required: true,
            type: 'phone',
          }}
        />
        <Dropdown
          label="Relationship"
          inputProps={{
            required: true,
            name: 'relationship',
          }}
          options={[
            {
              label: 'Placeholder',
              value: 'placeholder',
            },
          ]}
        />
      </div>
    </FormPage>
  );
}

export default AboutPage;
