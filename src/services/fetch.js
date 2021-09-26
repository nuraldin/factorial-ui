const fetchWrapper = async (resource = '', body, method = 'GET') => {
  let config = {
    method: method,
    headers: { 'Content-Type': 'application/json' }
  };
  
  if ( body ) config[body] = JSON.stringify(body);

  let response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${resource}`, config);
  return [await response.json(), response.ok];
};

export default fetchWrapper;