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
            id
            labName
            labDescription
        }
    }
`

export const LOAD_LAB_DETAILS = gql`
    query ($labid: String!){
        labDetails(labid: $labid){
            baseInfo{
                labName
            }
            longDescription
          }
          milestones(labid: $labid){
            milestone
            mileDes
          }
          resources(labid: $labid){
            resource
          }
    }
`
export const LOAD_USER_ID = gql`
    query ($username: String!){
        userId(username: $username){
            id
        }
    }
`
