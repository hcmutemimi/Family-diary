import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const API_URL = new InjectionToken<string>('apiUrl');

export const APICONFIG =  {
  BASEPOINT: environment.apiUrl,
  UPLOAD: {
    GET_URL : `/upload`
  },
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: `/auth/signup`,
    ACTIVE_ACCOUNT: `/auth/active/`,
    TYPE_OF_USER: `/auth/users/profile`,
    SEND_CODE: `/auth/reset-password/send-code`,
    CHECK_CODE_RESET: `/auth/reset-password/check-code`,
    RESET_PASSWORD: `/auth/reset-password/new-password`,
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
    GET_BY_ID:`/family/get-family`,
    CREATE: `/family`,
    DELETE: (id) => `/family/${id}`,
    CHECK_HOST: `/family/check-host`,
    UPDATE:(id) =>`/family/update/${(id)}`
  },
  FAMILY_MEMEBER: {
    ADD_MEMBER: `/family-member/add-member`,
    GET: `/family-member`,
    REMOVE_USER: (id) => `/family-member/remove/${id}`,
    GET_LIST : `/family-member/get-list`,
    GET_HISTORY_STATUS: `/family-member/history-status`,
    UPDATE_HISTORY_STATUS: `/family-member/update/history-status`
  },
  EVENT : {
    CREATE: `/event`,
    GET: `/event/events`,
    GET_BY_MONTH: `/event/event-by-month`,
    GET_EVENT_FAMILY: `/event/event-family`,
    UPDATE_STATUS: (id) => `/event/update-status-event/${id}`,
    DELETE: (id) => `/event/${id}`,
    GET_BY_ID: (id) => `/event/${id}`,
    UPDATE: (id)=>`/event/update/${id}`

  },
  HISTORY: {
    GET: `/history`
  }
}