import { createClient } from "contentful";
import { useEffect, useState } from "react";

const client = createClient({
    space: 'btc0ju006pql',
    environment: 'master',
    accessToken : import.meta.env.VITE_API_KEY,
    
});

export const useFetchProjects = () => {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    const getData = async() => {
        try{
            const response = await client.getEntries({content_type: "projects"});
            const projects = response.items.map((item)=>{
                const {title,image,url} = item.fields
                const {id} = item.sys.id
                const img = image?.fields?.file?.url

                return {title,img,url,id};
            })
            setLoading(false);
            setProjects(projects);
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getData();
    },[])

    return {loading,projects};
}
