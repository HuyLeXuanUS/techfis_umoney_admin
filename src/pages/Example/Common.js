import { useEffect } from "react"
//example sessionStorage
import { sessionVar } from "../../utils/constants";
import { getSessionVar, setSessionVar } from "../../utils/common/hashData";

const ExampleCommonFunction = () => {

    //#region sessionStorage Example
    useEffect(() => {
        // setSessionVar(sessionVar.user, "root_React_JS");
        // console.log(getSessionVar(sessionVar.user))    
    }, [])
    //#endregion

    return (
        <div>Example Common Function</div>
    )
}

export default ExampleCommonFunction