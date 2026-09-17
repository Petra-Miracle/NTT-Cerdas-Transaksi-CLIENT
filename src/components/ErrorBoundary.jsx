import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Terjadi kesalahan tak terduga:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-bold text-white">Waduh, ada yang error.</h1>
          <p className="max-w-md text-[var(--color-ink-on-bg-muted)]">
            Halaman ini gagal ditampilkan. Coba muat ulang atau kembali ke beranda.
          </p>
          <button type="button" className="btn-primary" onClick={this.handleReset}>
            Kembali ke beranda
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
