import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { FormPage } from '../client';

async function AboutPage() {
  const [{ message: profile }, { message: enums }] = await Promise.all([
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>('/api/action/profile'),
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.ApplicationEnums>>(
      '/api/action/applicationEnums',
    ),
  ]);

  console.log(enums);

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
            defaultValue: profile.firstName,
            required: true,
            name: 'firstName',
            disabled: true,
          }}
        />
        <Input
          label="Last name"
          inputProps={{
            placeholder: 'Last name',
            autoComplete: 'family-name',
            defaultValue: profile.lastName,
            required: true,
            name: 'lastName',
            disabled: true,
          }}
        />
        <Input
          label="Email"
          inputProps={{
            placeholder: 'hacker@hackthe6ix.com',
            autoComplete: 'email',
            defaultValue: profile.email,
            required: true,
            name: 'email',
            type: 'email',
            disabled: true,
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
          options={enums.gender.map((v) => ({ label: v, value: v }))}
        />
        <Dropdown
          label="Ethnicity"
          inputProps={{
            required: true,
            name: 'ethnicity',
          }}
          options={enums.ethnicity.map((v) => ({ label: v, value: v }))}
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
          options={enums.province
            .slice(0, 13)
            .map((v) => ({ label: v, value: v }))}
        />
        <Input
          label="Country"
          inputProps={{
            required: true,
            name: 'country',
            defaultValue: 'Canada',
            disabled: true,
          }}
        />
        <Dropdown
          label="Shirt size"
          data-start
          inputProps={{
            required: true,
            name: 'size',
          }}
          options={enums.shirt.map((v) => ({ label: v, value: v }))}
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
          options={enums.emergencyContactRelationship.map((v) => ({
            label: v,
            value: v,
          }))}
        />
      </div>
    </FormPage>
  );
}

export default AboutPage;
