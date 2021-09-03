import { gql } from '@apollo/client'

export const REGISTER = gql`mutation SIGN_UP($name: String! $email: String! $password: String! $confirmPassword: String! $profile_pic: String ){
    signUp(UserInput: { name: $name email: $email password: $password confirmPassword: $confirmPassword profile_pic: $profile_pic}){
      user{
      id
      name
      email
      profile_pic
    }
      token
    }
  }`


export const GET_USER = gql` 
query LOGIN($email: String! $password: String!) {
  loginUser(UserLoginInput: { email: $email password: $password}) {
    user {
      email
    }
    token
  }
}`
export const GET_ME = gql` 
query Get_Me {
  get_me {
    name
    email
    profile_pic
    
  }
}`

export const UPDATE_PASSWORD = gql`
mutation UPDATE_PASSWORD($currentPassword: String!, $password: String!, $confirmPassword: String!) {
  updatePassword(currentPassword: $currentPassword, password: $password, confirmPassword: $confirmPassword) {
    token
  }
}
`
export const LOGIN_USER = gql`
query LOGIN($email: String!, $password: String!) {
  loginUser(UserLoginInput: {email: $email, password: $password}) {
    user {
      email
      id
      name
      profile_pic
    }
    token
  }
}`

