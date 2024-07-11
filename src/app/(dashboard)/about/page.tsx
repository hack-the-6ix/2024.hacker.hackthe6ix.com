import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import Flex from '@/components/Flex';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { Form, WhyEthnicity } from './client';

async function AboutPage() {
  const [{ message: profile }, { message: enums }] = await Promise.all([
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>('/api/action/profile'),
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.ApplicationEnums>>(
      '/api/action/applicationEnums',
    ),
  ]);

  return (
    <Form
      readonly={profile.status.applied}
      updateTeamsUntil={profile.computedApplicationDeadline}
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
          label="I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements."
          inputProps={{
            defaultChecked: profile.hackerApplication?.emailConsent,
            readOnly: profile.status.applied,
            name: 'emailConsent',
          }}
          data-full
        />
        <Input
          label="Phone number"
          status={{
            type: 'session',
            key: 'phoneNumber',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.phoneNumber,
            readOnly: profile.status.applied,
            placeholder: '###-###-####',
            autoComplete: 'on',
            required: true,
            name: 'phoneNumber',
          }}
        />
      </div>
      <div data-grid>
        <Input
          label="Age by August 2nd"
          status={{
            type: 'session',
            key: 'age',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.age,
            readOnly: profile.status.applied,
            min: 14,
            max: 100,
            placeholder: 'Enter your age',
            required: true,
            name: 'age',
          }}
        />
        <Dropdown
          label="Gender"
          status={{
            type: 'session',
            key: 'gender',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.gender,
            readOnly: profile.status.applied,
            autoComplete: 'sex',
            required: true,
            name: 'gender',
          }}
          options={enums.gender.map((v) => ({ label: v, value: v }))}
        />
        <Dropdown
          label="Ethnicity"
          status={{
            type: 'session',
            key: 'ethnicity',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.ethnicity,
            readOnly: profile.status.applied,
            required: true,
            name: 'ethnicity',
          }}
          description={<WhyEthnicity />}
          options={enums.ethnicity.map((v) => ({ label: v, value: v }))}
        />
        <Input
          label="City"
          status={{
            type: 'session',
            key: 'city',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.city,
            readOnly: profile.status.applied,
            placeholder: 'Enter city name',
            required: true,
            maxLength: 256,
            name: 'city',
          }}
        />
        <Dropdown
          label="Province"
          status={{
            type: 'session',
            key: 'province',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.province,
            readOnly: profile.status.applied,
            required: true,
            name: 'province',
          }}
          options={enums.province.map((v) => ({ label: v, value: v }))}
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
          status={{
            type: 'session',
            key: 'shirtSize',
          }}
          data-start
          inputProps={{
            defaultValue: profile.hackerApplication?.shirtSize,
            readOnly: profile.status.applied,
            required: true,
            name: 'shirtSize',
          }}
          options={enums.shirt.map((v) => ({ label: v, value: v }))}
        />
        <Dropdown
          label="Please specify any dietary restrictions you have."
          data-full
          options={[
            ...enums.dietaryRestrictions.map((v) => ({
              label: v,
              value: v,
            })),
            {
              label: 'None',
              value: '',
            },
          ]}
          inputProps={{
            defaultValue: profile.hackerApplication?.dietaryRestrictions,
            readOnly: profile.status.applied,
            name: 'dietaryRestrictions',
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
          status={{
            type: 'session',
            key: 'emergencyContact.firstName',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.emergencyContact.firstName,
            readOnly: profile.status.applied,
            placeholder: 'First name',
            autoComplete: 'off',
            required: true,
            name: 'emergency.firstName',
            maxLength: 256,
          }}
        />
        <Input
          label="Last name"
          status={{
            type: 'session',
            key: 'emergencyContact.lastName',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.emergencyContact.lastName,
            readOnly: profile.status.applied,
            placeholder: 'Last name',
            autoComplete: 'off',
            required: true,
            name: 'emergency.lastName',
            maxLength: 256,
          }}
        />
        <Input
          label="Phone number"
          status={{
            type: 'session',
            key: 'emergencyContact.phoneNumber',
          }}
          inputProps={{
            defaultValue:
              profile.hackerApplication?.emergencyContact.phoneNumber,
            readOnly: profile.status.applied,
            placeholder: '###-###-####',
            autoComplete: 'off',
            required: true,
            name: 'emergency.phoneNumber',
          }}
        />
        <Dropdown
          label="Relationship"
          status={{
            type: 'session',
            key: 'emergency.relationship',
          }}
          inputProps={{
            defaultValue:
              profile.hackerApplication?.emergencyContact.relationship,
            readOnly: profile.status.applied,
            required: true,
            name: 'emergency.relationship',
          }}
          options={enums.emergencyContactRelationship.map((v) => ({
            label: v,
            value: v,
          }))}
        />
      </div>
    </Form>
  );
}

export default AboutPage;
