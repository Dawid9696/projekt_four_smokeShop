import React, {useEffect,useState} from 'react'
import { gql, useQuery, NetworkStatus } from '@apollo/client'
import { useRouter } from 'next/router'
import Header from '../../../components/Header'
import '../../../styles/detailPage.css'
import { initializeApollo } from '../../../lib/apolloClient'

const ONE_POST_QUERY = gql`
  query smoke($id: ID!) {
    smoke(id: $id) {
      id
      smokeName
      smokePrice
      smokePhoto
      smokePower
      smokeResistance
      smokeCapacity
    }
  }
`

const DetailSmoke = () => {

  const [contentStyle,setContentStyle] = useState({
    left:'300px',
    opacity:0,
  })

  useEffect(() => {
    setTimeout(() => setContentStyle({
      left:'0px',
      opacity:1
    }),0)
  })
  
  const router = useRouter()

  const onePostQueryVar = {
    id: router.query.DetailSmoke,
  }

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ONE_POST_QUERY,
    {
      variables: onePostQueryVar,
      notifyOnNetworkStatusChange: true,
    }
  )

  const {smokeName,smokePrice,smokePower,smokeResistance,smokePhoto,smokeCapacity} = data.smoke

return (
<section className="detailPage">
    <Header />
      <div className="detailPage-content" style={contentStyle}>

        <div className="detailPage-photo">
          <img  className="detailPage-photo-img" src={smokePhoto}/>
        </div>

        <div className="detailPage-divtable" >
          <table className="detailPage-table">
            <tr>
              <td><h3 style={{color:"#e04a0c"}}>{smokeName}</h3></td>
            </tr>
            <tr>
              <td>Cena</td>
              <td>{smokePrice} zł</td>
            </tr>
            <tr>
              <td>Moc</td>
              <td>{smokePower} W</td>
            </tr>
            <tr>
              <td>Rezystancja</td>
              <td>{smokeResistance} ohm</td>
            </tr>
            <tr>
              <td>Pojemność</td>
              <td>{smokeCapacity} mAh</td>
            </tr>
          </table> 
        </div>

      </div> 
  </section>
  )
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const POSTS_QUERY = gql`
  query {
    smokes {
        id
    }
  }
`
  const {data,loading} = await apolloClient.query({
    query: POSTS_QUERY
  })
  const paths = data.smokes.map((page) => {return { params: { DetailSmoke: page.id } }})
  return {paths,fallback: true}
}

export async function getStaticProps({params}) {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: ONE_POST_QUERY,
    variables: {id: params.DetailSmoke}
  })
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default DetailSmoke