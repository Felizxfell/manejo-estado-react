import React from 'react'

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    })

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        });
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        });
    }

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        });
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true
        });
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        })
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        })
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
                    onChange={(event) => onWrite(event.target.value)}
                />
                <button onClick={() => onCheck()}>Comprar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <>
                <p>¿Seguro que desea borrar el useState?</p>
                <button onClick={() => onDelete()}>Sí, eliminar</button>
                <button onClick={() => onReset()}>No, volver</button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con exito</p>
                <button onClick={() => onReset()}>Volver</button>
            </>
        )
    }
}

export { UseState }