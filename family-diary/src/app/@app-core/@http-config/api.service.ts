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
  },
  CALENDARS: {
    GET_BY_MONTH: `/app/calendars/month`,
    GET_BY_WEEK: `/app/calendars/week`,
    GET_BY_DAY: `/app/calendars/day`,
  },
  ACCOUNT: {
    PROFILE_USER: `/user`,
    UPDATE_PROFILE: `/user/update_info`,
    UPDATE_PASS: `/user/update_password`,
    GETDETAIL: (id) => `/app/users/${id}`,
    EDIT: (id) => `/app/users/${id}`,
  },
  FAMILY: {
    GET: `/family`,
    CREATE: `/family`,
    DELETE: (id) => `/family/${id}`,
    CHECK_HOST: `/family/check-host`
  },
  FAMILY_MEMEBER: {
    GET: `/family-member`,
    REMOVE_USER: (id) => `/family-member/remove/${id}`
  },
  EVENT : {
    CREATE: `/event`,
    GET: `/event/events`,
    UPDATE_STATUS: (id) => `/event/update-status-event/${id}`,
    DELETE: (id) => `/event/${id}`,
    GET_BY_ID: (id) => `/event/${id}`,
    UPDATE: (id)=>`/event/update/${id}`

  }
}