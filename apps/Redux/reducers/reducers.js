
let dataState = {
    data: null,
}

const reducer = (state = dataState, action) => {
    switch (action.type) {
        case 'ADD_DATA':
            return {
                ...state,
                data: action.data
            }

        default:
            return state;
    };
}


export default reducer