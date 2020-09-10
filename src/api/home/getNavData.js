import request from '../request'

export default function getNavData(){
  return request({
    url:'/menus',
    method:'get'
  })
}