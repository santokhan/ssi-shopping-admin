import { useEffect, useState } from "react";
import PropertiesTable from "../../blocks/table/PropertiesTable";
import api from "../../axios/api";
import Spinner from "../../components/loader/Spinner";

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
            {loading && <Spinner />}
            {
                agents &&
                <PropertiesTable agents={agents} />
            }
        </>
    )
}

export default Agents;