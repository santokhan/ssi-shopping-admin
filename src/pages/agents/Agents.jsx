import { useEffect, useState } from "react";
import api from "../../axios/api";
import Spinner from "../../components/loader/Spinner";
import AgentTable from "../../blocks/table/AgentTable";


const Agents = () => {
    const [agents, setAgents] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        api.get('agents/').then((res) => {
            if (res.data) {
                setAgents(res.data.results);
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })

        return () => { }
    }, [])


    return (
        <>
            {
                loading ?
                    <Spinner />
                    :
                    <AgentTable agents={agents} />
            }
        </>
    )
}

export default Agents;