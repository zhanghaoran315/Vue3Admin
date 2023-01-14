// 这个文件的目的让处理全局变量的报错
declare module 'vue' {
  interface ComponentCustomProperties {
    $format: any
  }
}

export {}
