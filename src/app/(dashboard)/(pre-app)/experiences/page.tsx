import { redirect } from 'next/navigation';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Autocomplete from '@/components/Autocomplete';
import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import { Form, ResumeUpload } from './client';

async function ExperiencesPage() {
  const [{ message: profile }, { message: enums }] = await Promise.all([
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.HackerProfile>>('/api/action/profile'),
    fetchHt6<Ht6Api.ApiResponse<Ht6Api.ApplicationEnums>>(
      '/api/action/applicationEnums',
    ),
  ]);

  return (
    <Form
      status={profile.status}
      updateTeamsUntil={profile.computedApplicationDeadline}
    >
      <div data-grid>
        <Autocomplete
          label="Your School (Most Recently Attended)"
          status={{
            type: 'session',
            key: 'school',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.school,
            readOnly: !profile.status.canApply,
            placeholder: 'Your school',
            required: true,
            name: 'school',
          }}
          options={enums.school}
        />
        <Dropdown
          label="Your Program of Study"
          status={{
            type: 'session',
            key: 'program',
          }}
          inputProps={{
            defaultValue: profile.hackerApplication?.program,
            readOnly: !profile.status.canApply,
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
            readOnly: !profile.status.canApply,
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
            readOnly: !profile.status.canApply,
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
            readOnly: !profile.status.canApply,
            required: true,
            name: 'hacakthonsAttended',
          }}
          options={enums.hackathonsAttended.map((v) => ({
            label: v,
            value: v,
          }))}
        />
        <ResumeUpload
          readOnly={!profile.status.canApply}
          friendlyResumeFileName={
            profile.hackerApplication?.friendlyResumeFileName
          }
        />
        <Checkbox
          label="I allow Hack the 6ix to distribute my resume to its event sponsors."
          inputProps={{
            defaultChecked: profile.hackerApplication?.resumeSharePermission,
            readOnly: !profile.status.canApply,
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
            readOnly: !profile.status.canApply,
            placeholder: 'ex: https://domain1.com/projects',
            name: 'githubLink',
            maxLength: 1024,
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
            readOnly: !profile.status.canApply,
            placeholder: 'ex: https://johndoe.com',
            name: 'portfolioLink',
            maxLength: 1024,
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
            readOnly: !profile.status.canApply,
            placeholder: 'ex: https://linkedin.com/in/johndoe',
            name: 'linkedinLink',
            maxLength: 1024,
            type: 'url',
          }}
          data-start
        />
      </div>
    </Form>
  );
}

export default ExperiencesPage;
