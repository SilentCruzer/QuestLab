import {gql} from '@apollo/client'

export const LOAD_USER_lOGIN = gql`
    mutation tokenAuth(
        $username: String!
        $password: String!
        ){
        tokenAuth(
            username: $username
            password: $password
        ) {
            success,
            errors,
            token,
            refreshToken
            user{
                username
                id
            }
        }
    }
`