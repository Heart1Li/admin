import request from '../request'

export default function editUserData(id,data){
  return request({
    url:`/users/${id}`,
    method:'put',
    data:data,
    // params:params
  })
}