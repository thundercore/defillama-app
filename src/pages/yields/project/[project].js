import YieldPage from 'components/YieldsPage'
import { GeneralLayout } from 'layout'
import { revalidate, getYieldPageData } from 'utils/dataApi'

export async function getStaticPaths() {
  const data = await getYieldPageData()

  const paths = data.props.projectList.map((project) => ({ params: { project } }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params: { project } }) {
  const data = await getYieldPageData({ projectName: project })

  return {
    ...data,
    revalidate: revalidate(),
  }
}

export default function YieldProjectPage(props) {
  return (
    <GeneralLayout title={`Yield Rankings - DefiLlama`} defaultSEO>
      <YieldPage {...props} />
    </GeneralLayout>
  )
}
