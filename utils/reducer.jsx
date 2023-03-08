export const actionTypes = {
    CHANGE_THEME: "CHANGE_THEME",

}


export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_THEME:
            return {
                ...state,
                theme: state.theme === "dark" ? "light" : "dark"
            }

        default: return state;
    }


}