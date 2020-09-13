import request  from '../request'

export default function deleteRolesData(id){
  return request({
    url:`/roles/${id}`,
    method:'delete',
  })
}