import React from 'react'

function View({match}) {

    let temp = match.params.lab
    let labname = ""
    try{
        labname = temp.replace("%20"," ")
    }catch(err){
        labname = temp
    }
    console.log(temp);

    return (
        <div>
            Hello {labname}
        </div>
    )
}

export default View
