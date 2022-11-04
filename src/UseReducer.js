import React from 'react'

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    React.useEffect(() => {
        console.log("Empezando el efecto");

        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación");

                if (state.value === SECURITY_CODE) {
                    dispatch({ type: 'CONFIRM' })
                } else {
                    dispatch({ type: 'ERROR' })
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
                    onChange={(event) => 
                        dispatch({ type: 'WRITE', payload: event.target.value })                        
                    }
                />
                <button onClick={() => dispatch({ type: 'CHECK' }}>Comprar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <>
                <p>¿Seguro que desea borrar el useState?</p>
                <button onClick={() => dispatch({ type: 'DELETE' })}>Sí, eliminar</button>
                <button onClick={() => dispatch({ type: 'RESET' }}>No, volver</button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con exito</p>
                <button onClick={() => dispatch({ type: 'RESET' })}>Volver</button>
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

const reducerOBJECT = (state, payload) => ({
    'CONFIRM': {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    'WRITE': {
        ...state,
        value: payload,
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'RESET': {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
})

const reducer = (state, action) => {
    if (reducerOBJECT(state)[action.type]) {
        return reducerOBJECT(state, action.payload)[action.type];
    } else {
        return {
            ...state,
        }
    }
}

export { UseReducer };