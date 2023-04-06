// 使用 requestAnimation API 模拟实现 setTimeout 和 setInterval

// 模拟实现 setTimeout
function _setTimeout(fn, delay = 300){
  let timer = {id: undefined}; // 利用对象保存实时的id
  let prevTime = -Infinity;

  function f(){
    timer.id = window.requestAnimationFrame(f);
    if(prevTime === -Infinity) prevTime = Date.now();
    let nowTime = Date.now();
    const interval = parseInt(nowTime - prevTime);
    if(interval >= delay){
      fn.call(this);
    }
  }

  f();

  return timer;
}

function _clearTimeout(timerId){
  window.cancelAnimationFrame(timerId);
}


// 模拟实现 setInterval
function _setInterval(fn, interval = 300){
  let timer = {id: undefined};
  let prevTime = -Infinity;

  function f(){
    timer.id = window.requestAnimationFrame(f);
    if(prevTime === -Infinity) prevTime = Date.now();
    let nowTime = Date.now();
    const delta = parseInt(nowTime - prevTime);
    if(delta >= interval){
      prevTime = nowTime;
      fn.call(this);
    }
  }

  f()
  
  return timer;
}

function _clearInterval(timerId){
  window.cancelAnimationFrame(timerId)
}

let p1 = Date.now();
let timeoutTimer = _setTimeout(() => {
  // 计算间隔时间
  const delta = Date.now() - p1;
  console.log("_setTimeout", parseInt(delta));
  _clearTimeout(timeoutTimer.id);
}, 2 * 1000)


let count = 0;
let t1 = Date.now();
let intervalTimer = _setInterval(() => {
  count++;
  // 计算每次执行的间隔时间
  let t2 = Date.now();
  const delta = parseInt(t2 - t1);
  t1 = t2;
  console.log("_setInterval: ", count, delta);
  if(count === 5) _clearInterval(intervalTimer.id);
}, 2 * 1000)