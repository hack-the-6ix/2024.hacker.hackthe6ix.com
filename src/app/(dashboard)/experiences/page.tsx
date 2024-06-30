import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import FileUpload from '@/components/FileUpload';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { FormPage } from '../client';
import { submitApplication } from './actions';
import { SaveAndContinue } from './client';

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
      noValidate
    >
      <div data-grid>
        <Dropdown
          label="Your School (Most Recently Attended)"
          inputProps={{
            defaultValue: profile.hackerApplication?.school,
            required: true,
            name: 'school',
          }}
          options={enums.school.map((v) => ({ label: v, value: v }))}
        />
        <Dropdown
          label="Your Program of Study"
          inputProps={{
            defaultValue: profile.hackerApplication?.program,
            required: true,
            name: 'program',
          }}
          options={enums.programOfStudy.map((v) => ({ label: v, value: v }))}
        />
        <Dropdown
          label="Year of Study"
          inputProps={{
            defaultValue: profile.hackerApplication?.levelOfStudy,
            required: true,
            name: 'levelOfStudy',
          }}
          options={enums.levelOfStudy.map((v) => ({ label: v, value: v }))}
        />
        <Dropdown
          label="Number of Hackathons Attended"
          inputProps={{
            defaultValue: profile.hackerApplication?.hackathonsAttended,
            required: true,
            name: 'hacakthonsAttended',
          }}
          options={enums.hackathonsAttended.map((v) => ({
            label: v,
            value: v,
          }))}
        />
        <FileUpload
          label="Your resume"
          inputProps={{
            accept: '.pdf',
            required: true,
            name: 'resume',
          }}
        />
        <Checkbox
          label="I allow Hack the 6ix to distribute my resume to its event sponsors."
          inputProps={{
            defaultChecked: profile.hackerApplication?.resumeSharePermission,
            name: 'resumeSharePermission',
          }}
          data-full
        />
      </div>
      <div data-grid>
        <Input
          label="GitHub"
          inputProps={{
            defaultValue: profile.hackerApplication?.githubLink,
            placeholder: 'ex: https://domain1.com/projects',
            name: 'githubLink',
            type: 'url',
          }}
          data-start
        />
        <Input
          label="Link to Portfolio"
          inputProps={{
            defaultValue: profile.hackerApplication?.portfolioLink,
            placeholder: 'ex: https://johndoe.com',
            name: 'portfolioLink',
            type: 'url',
          }}
          data-start
        />
        <Input
          label="LinkedIn"
          inputProps={{
            defaultValue: profile.hackerApplication?.linkedinLink,
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
