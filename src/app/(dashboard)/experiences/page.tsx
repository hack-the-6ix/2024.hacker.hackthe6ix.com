import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { FormPage } from '../client';
import { submitApplication } from './actions';
import { ResumeUpload, SaveAndContinue } from './client';

async function ExperiencesPage() {
  const [{ message: profile }, { message: enums }] = await Promise.all([
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>('/api/action/profile'),
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.ApplicationEnums>>(
      '/api/action/applicationEnums',
    ),
  ]);

  return (
    <FormPage
      heading="Your Experiences"
      fields={[
        'school',
        'program',
        'levelOfStudy',
        'graduationYear',
        'resumeFileName',
        'resumeSharePermission',
        'githubLink',
        'portfolioLink',
        'linkedinLink',
      ]}
      onBack={{
        children: (
          <Flex as="span" align="center" gap="x-sm">
            <Icon size="xs" icon="arrow_back" />
            <span>Back</span>
          </Flex>
        ),
        href: '/about',
      }}
      action={submitApplication}
      onNext={<SaveAndContinue />}
      readonly={profile.status.applied}
      noValidate
    >
      <div data-grid>
        <Dropdown
          label="Your School (Most Recently Attended)"
          status={{
            type: 'session',
            key: 'school',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.school,
            readOnly: profile.status.applied,
            required: true,
            name: 'school',
          }}
          options={enums.school.map((v) => ({ label: v, value: v }))}
        />
        <Dropdown
          label="Your Program of Study"
          status={{
            type: 'session',
            key: 'program',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.program,
            readOnly: profile.status.applied,
            required: true,
            name: 'program',
          }}
          options={enums.programOfStudy.map((v) => ({ label: v, value: v }))}
        />
        <Dropdown
          label="Year of Study"
          status={{
            type: 'session',
            key: 'levelOfStudy',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.levelOfStudy,
            readOnly: profile.status.applied,
            required: true,
            name: 'levelOfStudy',
          }}
          options={enums.levelOfStudy.map((v) => ({ label: v, value: v }))}
        />
        <Input
          label="Year of Graduation"
          status={{
            type: 'session',
            key: 'graduationYear',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.graduationYear,
            readOnly: profile.status.applied,
            placeholder: '2023',
            required: true,
            name: 'graduationYear',
            type: 'number',
            min: 2023,
            max: 2031,
          }}
        />
        <Dropdown
          label="Number of Hackathons Attended"
          status={{
            type: 'session',
            key: 'hackathonsAttended',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.hackathonsAttended,
            readOnly: profile.status.applied,
            required: true,
            name: 'hacakthonsAttended',
          }}
          options={enums.hackathonsAttended.map((v) => ({
            label: v,
            value: v,
          }))}
        />
        <ResumeUpload
          readOnly={profile.status.applied}
          friendlyResumeFileName={
            profile.hackerApplication?.friendlyResumeFileName
          }
        />
        <Checkbox
          label="I allow Hack the 6ix to distribute my resume to its event sponsors."
          inputProps={{
            defaultChecked: profile.hackerApplication?.resumeSharePermission,
            readOnly: profile.status.applied,
            name: 'resumeSharePermission',
          }}
          data-full
        />
      </div>
      <div data-grid>
        <Input
          label="GitHub"
          status={{
            type: 'session',
            key: 'githubLink',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.githubLink,
            readOnly: profile.status.applied,
            placeholder: 'ex: https://domain1.com/projects',
            name: 'githubLink',
            type: 'url',
          }}
          data-start
        />
        <Input
          label="Link to Portfolio"
          status={{
            type: 'session',
            key: 'portfolioLink',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.portfolioLink,
            readOnly: profile.status.applied,
            placeholder: 'ex: https://johndoe.com',
            name: 'portfolioLink',
            type: 'url',
          }}
          data-start
        />
        <Input
          label="LinkedIn"
          status={{
            type: 'session',
            key: 'linkedinLink',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.linkedinLink,
            readOnly: profile.status.applied,
            placeholder: 'ex: https://linkedin.com/in/johndoe',
            name: 'linkedinLink',
            type: 'url',
          }}
          data-start
        />
      </div>
    </FormPage>
  );
}

export default ExperiencesPage;
