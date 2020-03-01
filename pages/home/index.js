import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh

// import { Container } from '@material-ui/core'
import BasicLayout from '../../src/layouts/BasicLayout'
import GlobalHeader from '../../src/layouts/GlobalHeader'
import Parallax from '../../src/layouts/Parallax'
import Footer from '../../src/layouts/Footer'

import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles);

const Home = () => {
  const classes = useStyles()

  return (
    <BasicLayout>
      <GlobalHeader fixed color='primary' brand="Digitech Solutions" />
        <Parallax image={require('../../public/static/img/header.jpg')}>
          <div className={classes.container} />
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}></div>
      <Footer />
    </BasicLayout>
  )
}

export default Home
