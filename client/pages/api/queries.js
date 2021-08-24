import { gql } from '@apollo/client'

export const REGISTER = gql`mutation SIGN_UP($name: String! $email: String! $password: String! $confirmPassword: String! ){
    signUp(UserInput: { name: $name email: $email password: $password confirmPassword: $confirmPassword}){
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