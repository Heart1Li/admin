import request from '../request'

export default function getUserData(params){
  return request({
    url:'/users',
    method:'get',
    params:params
  })
}