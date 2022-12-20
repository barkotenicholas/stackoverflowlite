const authHeader = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (user && user.token) ? { authorization: 'Bearer ' + user.token } : {}
};
export default authHeader