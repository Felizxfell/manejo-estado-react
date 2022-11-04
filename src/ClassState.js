import React, { Component } from 'react'
import { Loading } from "./Loading";

const SECURITY_CODE = "paradigma";

class ClassState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      loading: false,
      value: ''
    }
  }

  UNSAFE_componentWillMount() {
    console.log("UNSAFE_componentWillMount");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("Actualizacion");

    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("Doing the validation");

        if (SECURITY_CODE === this.state.value){
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ error: true, loading: false });
        }


        console.log("Finishing the validation");
      }, 3000);
    }
  }

  render() {
    const { error, loading, value } = this.state
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>

        <p>Por favor, escribe el código de seguridad.</p>

        {(error && !loading) && (
          <p>Error: el código es incorrecto</p>
        )}

        {loading && (
          <Loading />
        )}

        <input 
          placeholder='Código de seguridad' 
          value={value}
          onChange={(event) => {
            this.setState({ value: event.target.value })              
          }}
        />
        <button onClick={() => this.setState({ loading: true })}
        >Comprar</button>
      </div>
    )
  }
}

export { ClassState }