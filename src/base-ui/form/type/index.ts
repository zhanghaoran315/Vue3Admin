type IFormType = 'input' | 'password' | 'select' | 'datepicker'

interface IFormItem {
  field: string
  type: IFormType
  label: string
  placeholder?: string
  rules?: any[]
  options?: any[]
  otherOptions?: any
}

export type { IFormItem }
