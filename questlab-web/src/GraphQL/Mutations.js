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


export const CREATE_LAB = gql`
    mutation createLab(
        $labName: String!
        $labDescription : String!
        $user: String!
    ){
        createLab(
            input: {
                labName: $labName
                labDescription: $labDescription
                user: $user 
            }
        ) {
            lab{
                id
                labName
                labDescription
            }
        }
    }
`
export const CREATE_LAB_DETAILS = gql`
    mutation createLabdetail(
        $labName: String!
        $longDescription : String!
    ){
        createLabdetail(
            input: {
                labName: $labName
                longDescription: $longDescription 
            }
        ) {
            labDetail{
                baseInfo{
                    id
                    labName
                  }
                longDescription
            }
        }
    }
`

export const CREATE_RESOURCE = gql`
    mutation createResource(
        $labName: String!
        $resource : String!
    ){
        createResource(
            input: {
                labName: $labName
                resource: $resource
            }
        ) {
            resource{
                resource
            }
        }
    }
`

export const CREATE_MILESTONE = gql`
mutation createMilestone(
    $labName: String!
    $milestone : String!
    $mileDes : String!
){
    createMilestone(
        input: {
            labName: $labName
            milestone: $milestone
            mileDes: $mileDes
        }
    ) {
        milestone{
           milestone
           mileDes
        }
    }
}
`