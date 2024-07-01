import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import FileUpload from '@/components/FileUpload';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { FormPage } from '../client';
import { schools, majors, levels } from './options';

function ExperiencesPage() {
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
      }}
      onNext={{
        children: 'Save & continue',
      }}
    >
      <div data-grid>
        <Dropdown
          label="Your School (most recently attended)"
          inputProps={{
            required: true,
            name: 'school',
          }}
          options={schools}
        />
        <Dropdown
          label="Your Program of Study"
          inputProps={{
            required: true,
            name: 'program',
          }}
          options={majors}
        />
        <Dropdown 
          label="Level of Study"
          inputProps={{
            required: true,
            name: 'level',
          }}
          options={levels}
        />
        <Dropdown
          label="Graduation Year"
          inputProps={{
            required: true,
            name: 'year',
          }}
          options={[
            {
              label: "2023",
              value: "2023",
            },
            {
              label: "2024",
              value: "2024",
            },
            {
              label: "2025",
              value: "2025",
            },
            {
              label: "2026",
              value: "2026",
            },
            {
              label: "2027",
              value: "2027",
            },
            {
              label: "2028",
              value: "2028",
            },
            {
              label: "2029",
              value: "2029",
            },
            {
              label: "2030",
              value: "2030",
            },
            {
              label: "2031",
              value: "2031",
            }
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
              label: 'None',
              value: 'none',
            },
            {
              label: '1-3',
              value: '1-3',
            },
            {
              label: '4-6',
              value: '4-6',
            },
            {
              label: '7-9',
              value: '7-9',
            },
            {
              label: '10+',
              value: '10+',
            }
          ]}
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
            name: 'can-share',
          }}
          data-full
        />
      </div>
      <div data-grid>
        <Input
          label="GitHub"
          inputProps={{
            placeholder: 'https://github.com/ht6-hacker',
            name: 'github',
            type: 'link',
          }}
          data-start
        />
        <Input
          label="Link to Portfolio"
          inputProps={{
            placeholder: 'https://ilovehackthe6ix.com',
            name: 'portoflio',
            type: 'link',
          }}
          data-start
        />
        <Input
          label="LinkedIn"
          inputProps={{
            placeholder: 'https://linkedin.com/in/hackthe6ix',
            name: 'linkedin',
            type: 'link',
          }}
          data-start
        />
      </div>
    </FormPage>
  );
}

export default ExperiencesPage;
