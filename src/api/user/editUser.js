import request from '../request'

export default function editUser(params){
  return request({
    url:`/users/${params}`,
    method:'get',
    // params:params
  })
}