import { gql } from '@apollo/client';

export const REGISTER = gql`
mutation SIGN_UP($name: String! $email: String! $password: String! $confirmPassword: String! ){
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