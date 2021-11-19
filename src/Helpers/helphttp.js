export const helpHttp = () => {
    const customFetch = (endopoint, options) => {

        // esta constante indica que los datos estaran en JSON
        const defaultHeader = {
            accept:"application/json",
        };
        //auxiliar de peticiones Fetch
        // se usa para abortar la peticion 
        const controller = new AbortController();
        // se usa para escuchar eventos
        options.signal = controller.signal;
            // se defie GET como metodo predeterminado
        options.method = options.method || "GET";
        options.headers = options.headers
        ?{...defaultHeader,...options.headers}
        :defaultHeader;
        options.body = JSON.stringify(options.body)||false;

        if(!options.body) delete options.body;
        // se marca un tiempo limite 
        //setTimeout(() => controller.abort(),3000);

        return fetch (endopoint, options)
        .then ((res)=>res.ok
        ?res.json()
        :Promise.reject({
            err: true,
            status:res.status || "00",
            statusText:res.statusText || "Ocurrio un error",

        }))
        .catch ((err)=> err);

    };

    // se indican los 4 metodos

    const get = (url,options={})=> customFetch(url,options);
                

    const post = (url,options={})=>{
        options.method ="POST";
        return customFetch(url,options);
    };
    const put = (url, options={})=>{
        options.method ="PUT";
        return customFetch(url,options);
    };
    const del = (url, options={})=>{
        options.method ="DELETE";
        return customFetch(url, options);
    };
    
    return{
        get,
        post,
        put,
        del,
    };

};