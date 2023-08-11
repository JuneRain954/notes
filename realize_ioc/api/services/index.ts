/**
 * 服务类
 */
import { Injectable } from '../../utils/decorator';

@Injectable()
export class UserService {
  constructor(){}

  list(){
    return {
      code: 200,
      data: ["list", "list", "list"],
      msg: "success",
    };
  }

  detail(){
    return {
      code: 200,
      data: { name: "JuneRain", desc: "hhhhh"},
      msg: "success",
    };
  }

  add(){
    return {
      code: 200,
      data: [{name: "Joey"}, {name: "Rachel"}],
      msg: "success",
    };
  }
}
