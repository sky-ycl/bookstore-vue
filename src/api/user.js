import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function sendCode(phone) {
  return request({
    url: '/user/code',
    method: 'post',
    params: {
      phone
    }
  })
}
export function signCount() {
  return request({
    url: '/user/signCount',
    method: 'get'
  })
}
export function sign() {
  return request({
    url: '/user/sign',
    method: 'post'
  })
}

export function isSign() {
  return request({
    url: '/user/isSign',
    method: 'get'
  })
}
