import App from '../../components/App'
import '../../styles/mainPage.css'

import Items, {ALL_POSTS_QUERY} from '../../components/Items'
import { initializeApollo } from '../../lib/apolloClient'
import Header from '../../components/Header'

const IndexPage = () => (
  <App>
    <section className="main">
    <Header />
        <div  className="main-content">
            <Items />
        </div>
    </section>
  </App>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: ALL_POSTS_QUERY,

  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default IndexPage