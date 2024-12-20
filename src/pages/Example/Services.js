import { useEffect } from "react"
import { apiGetExample } from '../../services/examples';

const ExampleServices = () => {

    useEffect(() => {
        apiGetExample()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err.message)
            })
    }, [])

    return (
        <div>Example Service</div>
    )
}

export default ExampleServices