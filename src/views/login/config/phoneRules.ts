import type { FormRules } from 'element-plus'
export const phoneRules: FormRules = {
  number: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^1[3-9]{2}\d{8}$/,
      message: '手机号格式错误',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^\d{6}$/,
      message: '验证码格式不正确',
      trigger: 'blur'
    }
  ]
}
