import request  from '../request'

export default function getRightsList(){
  return request({
    url:'/rights/list',
    method:'get'
  })
}