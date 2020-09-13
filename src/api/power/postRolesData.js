import request  from '../request'

export default function postRolesData(roleId,idstr){
  return request({
    url:`/roles/${roleId}/rights`,
    method:'post',
    data:{rids:idstr}
  })
}