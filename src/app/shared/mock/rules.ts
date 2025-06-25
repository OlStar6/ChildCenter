export interface IUserRules {
  readonly path: string,
  readonly rules: {
    readonly read: boolean,
    readonly write: boolean
  }
}

export const UserRules: Readonly<IUserRules[]> = [
  {
    path: '',
    rules: {
      write: true,
      read: true
    }, 
  }
  ]


