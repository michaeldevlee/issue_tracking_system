const getBaseUrl = () =>{
    let base_url = process.env.NODE_ENV == 'development' ? 'http://localhost:2121' : 'https://issuetrackerbackend-production.up.railway.app';
    return base_url;
}

module.exports = getBaseUrl;