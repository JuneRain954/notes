/**
 * 控制器
 */


import { Controller, Get, Post, Inject, Injectable } from '../../utils/decorator';
import { UserService } from '../services';


@Injectable()
@Controller("/user")
class ApiController {
  @Inject()
  user: UserService;
  constructor(){}

  @Get("list")
  getList(){
    return this.user.list();
  }

  @Get("detail")
  getDetail(){
    return this.user.detail();
  }

  @Post("add")
  addData(){
    return this.user.add();
  }
}

export default ApiController;

