type Func = (...args: any) => any;
interface EffectOptions {
  scheduler?: Func;
}

interface WatchOptions {
  deee?: boolean;
  immediate?: boolean;
}