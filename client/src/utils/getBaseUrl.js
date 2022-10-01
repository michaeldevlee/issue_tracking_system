const getBaseUrl = () =>{
    let base_url = process.env.NODE_ENV == 'development' ? 'https://localhost:2121' : 'https://protofast-backend.onrender.com';
    return base_url;
}

module.exports = getBaseUrl;