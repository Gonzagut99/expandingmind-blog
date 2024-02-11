import React,{useState, useEffect} from 'react'

const requestTypes = {
    //get: 'GET',
    //post: 'POST',
    put: 'EDIT',
    delete: 'DELETE',
}

const actions = {
    [requestTypes.put]:{
        requestType: requestTypes.put,
        disabled: false,
        loading: false,
    },
    [requestTypes.delete]:{
        requestType: requestTypes.delete,
        disabled: false,
        loading: false,
    }
}

function RequestButton({children, requestType, disabled, loading, onClick}) {

    const [state, setState] = useState(actions[requestType])
    useEffect(() => {
        if (loading) {
            setState(prevState => ({...prevState, loading: true, disabled: true}))
        } else {
            setState(prevState => ({...prevState, loading: false, disabled: false}))
        }

        if (disabled) {
            setState(prevState => ({...prevState, disabled: true}))
        } else {
            setState(prevState => ({...prevState, disabled: false}))
        }
    }, [loading, disabled])

  return (
    <button disabled={state.disabled} onClick={onClick}>
        {!state.loading && children}
        {state.loading && 'Cargando...'}
    </button>
  )
}

export default RequestButton