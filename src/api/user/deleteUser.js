import request from '../request'

export default function deleteUser(id){
  return request({
    url:`/users/${id}`,
    method:'delete',
    // data:data
  })
}