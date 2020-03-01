import React, { Component } from 'react'
import Router from 'next/router'
import './style.css'

class PageLoading extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false,
    }
  }

  show = () => {
    this.setState({
      isShow: true,
    })
  }

  hide = () => {
    this.setState({
      isShow: false,
    })
  }

  isVisible () {
    const { isShow } = this.state
    return isShow
  }

  componentDidMount() {
		PageLoading.instance = this

    const { options } = this.props;

    if (options) {
      NProgress.configure(options);
    }

    Router.events.on('routeChangeStart', this.show);
    Router.events.on('routeChangeComplete', this.hide);
    Router.events.on('routeChangeError', this.hide);
  }


  componentWillUnmount () {
    delete PageLoading.instance
  }

  render () {
    const { isShow } = this.state

    if (!isShow) {
      return null
    }

    return (
      <div className='loading-wrapper'>
        <div className='blue ball' />
        <div className='red ball' />
        <div className='yellow ball' />
        <div className='green ball' />
      </div>
    )
  }
}

export default {
  Component: PageLoading,
  show () {
    PageLoading.instance && PageLoading.instance.show()
  },
  hide () {
    PageLoading.instance && PageLoading.instance.hide()
  },
  isVisible () {
    return PageLoading.instance.isVisible()
  },
}
