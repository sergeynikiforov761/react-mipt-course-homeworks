import axios from "axios";

const get = async (path) => {
    await wait();
    const response = await axios.get(path, {
        'content-type': 'application/json'
    });

    if (response.status !== 200) {
        throw Error(await response.json())
    }

    return response.data;
}

const post = async (path, body) => {
    const response = await axios.post(path, body, {
        'content-type': 'application/json'
    });

    if (response.status !== 200) {
        throw Error(await response.json())
    }

    return response.data;
}

const authPost = async (path, body) => {
    const tokens = JSON.parse(localStorage.getItem('AUTH'));

    const token = tokens && tokens.accessToken;
    console.log(token);
    if (!token) {
        throw Error("Token was not found");
    }

    const config = {
        headers: {"Content-Type": "application/json",
            'Authorization': `Bearer ${token}`}
    };

    const response = await axios.post(path, body, config)
        .catch(error => {
        console.log(error.response)});

    console.log("here", response.data);
    if (response.status !== 200) {
        throw Error(await response.json())
    }

    return response.data;
}

const wait = () => new Promise(r => setTimeout(r, 2000))

export default {
    post, get, authPost
};