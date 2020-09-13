import request  from '../request'

export default function getRolesList(id=''){
  return request({
    url:`/roles/${id}`,
    method:'get'
  })
}