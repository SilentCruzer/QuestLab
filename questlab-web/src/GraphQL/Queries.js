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

export const LOAD_LAB_DETAILS = gql`
    query ($labname: String!){
        labDetails(labname: $labname){
            longDescription
          }
          milestones(labname: $labname){
            milestone
            mileDes
          }
          resources(labname: $labname){
            resource
          }
    }
`