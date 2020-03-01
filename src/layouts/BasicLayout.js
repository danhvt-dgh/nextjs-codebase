import PageLoading from '../components/PageLoading'

const BasicLayout = props => {
  const { children } = props
  return <>{children} <PageLoading.Component /> </>
}

export default BasicLayout
