export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  photo: string
}

export interface UsersState {
  users: User[]
}