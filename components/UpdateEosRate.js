import {useContext, useEffect} from "react";
import {AppContext} from "../contexts/AppContext";
import axios from "axios";

const UpdateEosRate = () => {
    const {setEosRate} = useContext(AppContext)

    const updateEosRate = async () => {
        const res = await axios.get(
            'https://api.coingecko.com/api/v3/simple/price?ids=eos&vs_currencies=usd'
        )
        setEosRate(res.data['eos']['usd'])
    }

    useEffect(() => {
        updateEosRate()
        setInterval(() => {
            updateEosRate()
        }, 60000)
    }, [])
    return (
        <></>
    )
}

export default UpdateEosRate