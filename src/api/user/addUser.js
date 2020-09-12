import request from '../request'

export default function addUser(data){
  return request({
    url:'/users',
    method:'post',
    data:data
  })
}