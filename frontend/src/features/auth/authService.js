// axios like postman to make request, send token 
import axios from 'axios'


const API_URL = '/api/users/'


// Register user 
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// User Login
const login = async (userData) => {
    const response = await axios.post(API_URL + 'user', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    register,
    login,
    logout,
}

export default authService