import Link from 'next/link';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { FormPage } from '../client';
import { submitApplication } from './actions';
import { SaveAndContinue, WhyEthnicity } from './client';

async function AboutPage() {
  const [{ message: profile }, { message: enums }] = await Promise.all([
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>('/api/action/profile'),
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.ApplicationEnums>>(
      '/api/action/applicationEnums',
    ),
  ]);

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
        href: '/team',
      }}
      action={submitApplication}
      noValidate
      onNext={<SaveAndContinue />}
    >
      <div data-grid>
        <Input
          label="First name"
          inputProps={{
            placeholder: 'First name',
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
            defaultChecked: profile.hackerApplication?.emailConsent,
            name: 'emailConsent',
          }}
          data-full
        />
      </div>
      <div data-grid>
        <Dropdown
          label="Gender"
          inputProps={{
            defaultValue: profile.hackerApplication?.gender,
            autoComplete: 'sex',
            required: true,
            name: 'gender',
          }}
          options={enums.gender.map((v) => ({ label: v, value: v }))}
        />
        <Dropdown
          label="Ethnicity"
          inputProps={{
            defaultValue: profile.hackerApplication?.ethnicity,
            required: true,
            name: 'ethnicity',
          }}
          description={<WhyEthnicity />}
          options={enums.ethnicity.map((v) => ({ label: v, value: v }))}
        />
        <Input
          label="City"
          inputProps={{
            defaultValue: profile.hackerApplication?.city,
            placeholder: 'Enter city name',
            required: true,
            name: 'city',
          }}
        />
        <Dropdown
          label="Province"
          inputProps={{
            defaultValue: profile.hackerApplication?.province,
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
            defaultValue: profile.hackerApplication?.shirtSize,
            required: true,
            name: 'shirtSize',
          }}
          options={enums.shirt.map((v) => ({ label: v, value: v }))}
        />
        <Dropdown
          label="Please specify any dietary restrictions you have."
          data-full
          options={enums.dietaryRestrictions.map((v) => ({
            label: v,
            value: v,
          }))}
          inputProps={{
            defaultValue: profile.hackerApplication?.dietaryRestrictions,
            name: 'dietaryRestrictions',
          }}
        />
        <Input
          label="Please specify any allergies you have."
          data-full
          inputProps={{
            defaultValue: profile.hackerApplication?.healthWarnings,
            placeholder: 'ie: peanuts, nuts',
            name: 'healthWarnings',
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
            defaultValue: profile.hackerApplication?.emergencyContact.firstName,
            placeholder: 'First name',
            autoComplete: 'off',
            required: true,
            name: 'emergency.firstName',
          }}
        />
        <Input
          label="Last name"
          inputProps={{
            defaultValue: profile.hackerApplication?.emergencyContact.lastName,
            placeholder: 'Last name',
            autoComplete: 'off',
            required: true,
            name: 'emergency.lastName',
          }}
        />
        <Input
          label="Phone number"
          inputProps={{
            defaultValue:
              profile.hackerApplication?.emergencyContact.phoneNumber,
            placeholder: '###-###-####',
            autoComplete: 'off',
            required: true,
            type: 'emergency.phoneNumber',
          }}
        />
        <Dropdown
          label="Relationship"
          inputProps={{
            defaultValue:
              profile.hackerApplication?.emergencyContact.relationship,
            required: true,
            name: 'emergency.relationship',
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
