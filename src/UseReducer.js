import React from 'react'

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onConfirm = () => {
        dispatch({ type: actionTypes.CONFIRM })
    }

    const onError = () => {
        dispatch({ type: actionTypes.ERROR })
    }

    const onWrite = ({ target: { value } }) => {
        dispatch({ type: actionTypes.WRITE, payload: value })
    }

    const onCheck = () => {
        dispatch({ type: actionTypes.CHECK })
    }

    const onDelete = () => {
        dispatch({ type: actionTypes.DELETE })
    }

    const onReset = () => {
        dispatch({ type: actionTypes.RESET })
    }

    React.useEffect(() => {
        console.log("Empezando el efecto");

        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación");

                if (state.value === SECURITY_CODE) {
                    onConfirm()
                } else {
                    onError()
                }

                console.log("Terminando la validación");
            }, 3000);
        }

        console.log("Terminando el efecto");
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>

                <p>Por favor, escribe el código de seguridad.</p>

                {(state.error && !state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}
                {state.loading && (
                    <p>Loading...</p>
                )}
                <input
                    placeholder='Código de seguridad'
                    value={state.value}
                    onChange={onWrite}
                />
                <button onClick={onCheck}>Comprar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <>
                <p>¿Seguro que desea borrar el useState?</p>
                <button onClick={onDelete}>Sí, eliminar</button>
                <button onClick={onReset}>No, volver</button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con exito</p>
                <button onClick={onReset}>Volver</button>
            </>
        )
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const actionTypes = {
    CONFIRM: 'CONFIRM',
    WRITE: 'WRITE',
    ERROR: 'ERROR',
    CHECK: 'CHECK',
    DELETE: 'DELETE',
    RESET: 'RESET',
}

const reducerOBJECT = (state, payload) => ({
    [actionTypes.CONFIRM]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.WRITE]: {
        ...state,
        value: payload,
    },
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.CHECK]: {
        ...state,
        loading: true
    },
    [actionTypes.DELETE]: {
        ...state,
        deleted: true,
    },
    [actionTypes.RESET]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
})

const reducer = (state, action) => {
    // if (reducerOBJECT(state)[action.type]) {
    //     return reducerOBJECT(state, action.payload)[action.type];
    // } else {
    //     return state
    // }
    return reducerOBJECT(state, action.payload)?.[action.type] ?? state;
}

export { UseReducer };