import { string } from 'zod';

export namespace Ht6Api {
  export type ApplicationStatus = string;

  export interface ApiResponse<Data> {
    status: number;
    message: Data;
  }

  export interface Team {
    code: string;
    memberNames: string[];
  }

  export interface HackerProfile {
    _id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    created: number;
    computedApplicationOpen: number;
    computedApplicationDeadline: number;
    computedRSVPDeadline: number;
    checkInNotes: string[];
    rsvpForm: {
      selectedCompanies: string[];
      remindInPersonRSVP: boolean;
    };
    roles: {
      hacker: boolean;
      admin: boolean;
      organizer: boolean;
      volunteer: boolean;
    };
    status: {
      textStatus: ApplicationStatus;
      applied: boolean;
      accepted: boolean;
      rejected: boolean;
      waitlisted: boolean;
      confirmed: boolean;
      declined: boolean;
      checkedIn: boolean;
      rsvpExpired: boolean;
      applicationExpired: boolean;
      canAmendTeam: boolean;
      canApply: boolean;
      canRSVP: boolean;
      isRSVPOpen: boolean;
    };
    hackerApplication: { emergencyContact: {} };
  }

  export interface ApplicationEnums {
    school: string[];
    programOfStudy: string[];
    gender: string[];
    pronouns: string[];
    ethnicity: string[];
    shirt: string[];
    province: string[];
    countries: string[];
    levelOfStudy: string[];
    hackathonsAttended: string[];
    requestedWorkshops: string[];
    emergencyContactRelationship: string[];
    dietaryRestrictions: string[];
  }
}

export default Ht6Api;
