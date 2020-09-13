import request  from '../request'

export default function addRolesData(data){
  return request({
    url:'/roles',
    method:'post',
    data:data
  })
}