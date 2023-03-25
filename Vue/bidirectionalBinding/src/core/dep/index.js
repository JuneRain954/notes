// 依赖收集器
export class Dep{
  static target = undefined;
  deps = undefined;
  constructor(){
    this.deps = new Set();
  }

  /**
   * 收集依赖
   * @param {Watcher} dep 需收集的观察者Watcher实例
   */
  add(dep){
    this.deps.add(dep);
  }

  /**
   * 触发依赖
   */
  notify(){
    this.deps.forEach(dep => dep.update());
  }

  /**
   * 移除依赖
   * @param {Watcher} dep 目标观察者 Watcher 实例
   */
  remove(dep){
    if(this.deps.has(dep)) this.deps.delete(dep);
  }
}

