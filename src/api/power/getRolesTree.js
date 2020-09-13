import request  from '../request'

export default function getRolesTree(){
  return request({
    url:'/rights/tree',
    method:'get'
  })
}