type Func = (...args: any) => any;
interface EffectOptions {
  scheduler?: Func;
}