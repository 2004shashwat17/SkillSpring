import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    // also log to console for developer
    console.error('ErrorBoundary caught', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{padding:40,fontFamily:'Inter,system-ui,Arial',color:'#111'}}>
          <h2>Something went wrong</h2>
          <pre style={{whiteSpace:'pre-wrap',background:'#f8f8f8',padding:12,borderRadius:6}}>
            {String(this.state.error && this.state.error.toString())}
          </pre>
          <details style={{whiteSpace:'pre-wrap',marginTop:12}}>
            {this.state.info && this.state.info.componentStack}
          </details>
        </div>
      )
    }
    return this.props.children
  }
}
