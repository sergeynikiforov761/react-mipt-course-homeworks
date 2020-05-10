export const required = value => {
    if (value) return undefined;
    return 'Field is required';

}

export const maxLenghtCreator = (maxLenght) => (value) => {
    if (value && value.length > maxLenght) return `Max lenght is ${maxLenght} symbols!`;
    return undefined;
}

export const minLenghtCreator = (minLenght) => (value) => {
    if (value && value.length < minLenght) return `Min lenght is ${minLenght} symbols!`;
    return undefined;
}

export const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email && !re.test(email)) return `Check email!`;
    return undefined;
}

export const match = matchName => (value, allValues, props) =>
    value !== allValues[matchName]
        ? `This field must match with ${matchName} field`
        : undefined;

