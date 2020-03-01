import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, IconButton, Hidden, Button } from '@material-ui/core'
import Menu from "@material-ui/icons/Menu";
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './styles'

const useStyles = makeStyles(styles)

export default function GlobalHeader (props) {
  const classes = useStyles()

  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange)
    }
    return function cleanup () {
      if (props.changeColorOnScroll) {
        window.removeEventListener('scroll', headerColorChange)
      }
    }
  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  })

  const brandComponent = (
    <Link href='/' as='/'>
      <Button className={classes.title}>{brand}</Button>
    </Link>
  )

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {leftLinks !== undefined ? brandComponent : null}
        <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation='css'>
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        <Hidden smDown implementation='css'>
          {rightLinks}
        </Hidden>
        <Hidden mdUp>
          <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

GlobalHeader.defaultProp = {
  color: 'white',
}

GlobalHeader.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node
}
