// import '@babel/polyfill'
const add = (x, y) => {
  return x + y;
}

const promise = new Promise((res) => {
  setTimeout(() => {
    console.log('定时器执行完了～');
    rres();
  },1000)
})
console.log(add(3, 4));
