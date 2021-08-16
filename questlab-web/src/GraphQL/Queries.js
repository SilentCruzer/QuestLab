import {gql} from '@apollo/client'

export const LOAD_USER = gql`
    query{
        users{
            id
            username
        }
    }
`

export const LOAD_USER_LABS = gql`
    query Labs($user: String!){
        labs(user: $user){
            labName
            labDescription
        }
    }
`