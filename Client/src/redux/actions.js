import axios from 'axios';

export const LOGIN_USER_GUEST = 'LOGIN_USER_GUEST';
export const LIST_USERS_IN_PRE_ROOM = 'LIST_USERS_IN_PRE_ROOM';
export const SET_READY = 'SET_READY';
export const NEW_USER = 'NEW_USER';
export const LOGIN = 'LOGIN';
export const CREATE_ROOM = 'CREATE_ROOM';
export const GET_AVATARS = 'GET_AVATARS';
export const LIST_ROOMS = 'LIST_ROOMS';
export const CHANGE_READY = 'CHANGE_READY';
export const GET_NEW_QUESTIONS = 'GET_NEW_QUESTIONS';
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS';
export const GET_READY_USER = 'GET_READY_USER';
export const USER_TOKEN = 'USER_TOKEN';
export const EDIT_ROOM = 'EDIT_ROOM';
export const DELETE_ROOM = 'DELETE_ROOM';
export const REMOVE_USER = 'REMOVE_USER';
export const FAST_CHANGE_HOST_ROOM = 'FAST_CHANGE_HOST_ROOM';
export const ALL_USERS = 'ALL_USERS';
export const ALL_USERS_LEVEL = 'ALL_USERS_LEVEL';
export const UPDATE_POINTS = 'UPDATE_POINTS';
export const FAST_REMOVE = 'FAST_REMOVE';



export function getAllQuestions() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/question`)
            dispatch({ type: GET_ALL_QUESTIONS, payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}


export function modifyQuestion(dataQuestion) {
    return async function () {
        try {
            await axios.put(`/question`, dataQuestion)           
        } catch (e) {
            console.log(e)
        }
    }
}

export function loginAsGuest(guest) {
    return async function (dispatch) {
        try {
            const test = await axios.post('/users', guest)
            dispatch({ type: 'LOGIN_USER_GUEST', payload: test.data })
            console.log(test.data)
            return test.data
        } catch (e) {
            console.log(e)
        }
    }
}

export function registerUser(user) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post('/users', user)
            dispatch({ type: 'NEW_USER', payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function loginUser(email) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/users?email=${email}`)
            dispatch({ type: 'LOGIN', payload: data })
            console.log(data)
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export const bannUser = (email) => async () => {
    try {        
        await axios.put(`/users/banner?email=${email}`)
    } catch (error) {
        console.log(error)
    }
}

export const createAdmin = (user) => async () => {
    try {
        await axios.put(`/users/admin`, user)
    } catch (error) {
        console.log(error)
    }
}

export function allUsers() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/users`)
            dispatch({ type: 'ALL_USERS', payload: data })
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export const allUsersLevel = () => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/users`);
            console.log("actions: ", data);
            dispatch({ type: 'ALL_USERS_LEVEL', payload: data });
            return data
        } catch (e) {
            console.log(e)
        }
    }
}


export const updateUser = (userData) => async () => {
    try {
        await axios.put(`/users`, userData)
    } catch (error) {
        console.log(error)
    }
}

export function removeUser(users) {
    return function (dispatch) {
        dispatch({ type: 'REMOVE_USER', payload: users })
    }
}

export function fastChangeHostRoom(email) {
    return function (dispatch) {
        dispatch({ type: 'FAST_CHANGE_HOST_ROOM', payload: email })
    }
}


export function createRoom(user) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post('/gameRoom', { name: user.name, idUser: user.id, avatar: user?.avatars?.[0]?.imageUrl })
            dispatch({ type: 'CREATE_ROOM', payload: data })
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export const getAvatars = () => async (dispatch) => {
    try {
        const result = await axios.get(`/avatar`)
        dispatch({ type: GET_AVATARS, payload: result.data })
    } catch (error) {
        console.log(error)
    }
}

//arreglar en back
export function listUsersInPreRoom(IdRoom) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/gameRoom/?idRoom=${IdRoom}`)
            dispatch({ type: 'LIST_USERS_IN_PRE_ROOM', payload: data })
            console.log(data)
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

export function getReadyUser(id) {
    return async function (dispatch) { // me traigo el id y ready(un bolean)
        try {
            const { data } = await axios.get(`/users/ready/?id=${id}`)
            dispatch({ type: 'GET_READY_USER', payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function listAllRooms() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get('/gameRoom')
            dispatch({ type: 'LIST_ROOMS', payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function editRoom({ idRoom, public_, questions }) {
    return async function (dispatch) {
        try {
            const { data } = await axios.put('/gameRoom', { idRoom, public_, questions })
            dispatch({ type: 'EDIT_ROOM', payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function newQuestion(question) {
    return async function () {
        try {
            await axios.post('/newQuestion', question)

        } catch (e) {
            console.log(e)
        }
    }
}

export function getNewQuestions() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get('/newQuestion')
            dispatch({ type: GET_NEW_QUESTIONS, payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleQuestion(id, condition) {

    return async function () {
        try {
            if (condition === "accept") {
                console.log(id, "id en action", condition, "condicion")
                await axios.put(`/newQuestion/?id=${id}`)

            } else {

                await axios.delete(`/newQuestion/?id=${id}`)
            }

        } catch (e) {
            console.log(e)
        }
    }
}

export function userToken(token) {
    return {
        type: USER_TOKEN,
        payload: token
    }
}

export function fastRemove(id) {
    return {
        type: FAST_REMOVE,
        payload: id
    }
}


export function changePoint({ id, pointsTotal, point }) {
    return {
        type: UPDATE_POINTS,
        payload: { id, pointsTotal, point }
    }
}

export function sendingMail(data) {
    return async function () {
        try {
            await axios.post('/send_mail', data)

        } catch (e) {
            console.log(e)
        }
    }
}