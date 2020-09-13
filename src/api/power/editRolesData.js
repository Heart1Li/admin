import request  from '../request'

export default function editRolesData(id,data){
  return request({
    url:`/roles/${id}`,
    method:'put',
    data:data
  })
}