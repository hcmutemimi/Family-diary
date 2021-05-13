import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const API_URL = new InjectionToken<string>('apiUrl');

export const APICONFIG =  {
  BASEPOINT: environment.apiUrl,
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: `/auth/signup`,
    ACTIVE_ACCOUNT: `/auth/active/`,
    TYPE_OF_USER: `/auth/users/profile`,
    RESET_PASSWORD_EMAIL: `/reset_password/send_code`,
    CHECK_CODE_RESET: `/reset_password/check_code`,
    RESET_PASSWORD: `/reset_password/reset_password`,
    COUNTRY_CODE: `/country_codes`,
    UPDATE_AVATAR: `/app/app_users/update_avatar`,
    CHANGE_PASS: `/app/app_users/change_password`,
  },
  CALENDARS: {
    GET_BY_MONTH: `/app/calendars/month`,
    GET_BY_WEEK: `/app/calendars/week`,
    GET_BY_DAY: `/app/calendars/day`,
  },
  ACCOUNT: {
    PROFILE_USER: `/user`,
    UPDATE_PROFILE: `/app/app_users/update_profile`,
    UPDATE_PASS: `/app/users/update_password`,
    GETDETAIL: (id) => `/app/users/${id}`,
    EDIT: (id) => `/app/users/${id}`,
    DELETE: (id) => `/app/users/${id}`,
    UPDATE_PREMIUM: (id) => `/app/users/request_upgrade`,
    CONTACT_ADMIN: `/app/interact_email/submit`
  },
  FAMILY: {
    GET: `/family`
  },
  FAMILY_MEMEBER: {
    GET: `/family-member`
  }
}