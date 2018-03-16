let cssEl = document.createElement('style')
document.documentElement.firstElementChild.appendChild(cssEl)

export default {
  setPxPerRem: function() {
    let dpr = 1

    // 把viewport分成10份的rem，html标签的font-size设置为1rem的大小;
    let pxPerRem = document.documentElement.clientWidth * dpr / 10
    cssEl.innerHTML = 'html{font-size:' + pxPerRem + 'px!important;}'
  }
}
