import { gql, useQuery,useMutation, NetworkStatus } from '@apollo/client'
import { TiDelete } from 'react-icons/ti';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react';

export const ALL_POSTS_QUERY = gql`
  query {
    smokes {
        id
        smokeName
        smokePrice
        smokePhoto
    }
  }
`

const DELETE_POST_QUERY = gql`
  mutation deleteSmoke($id: ID!) {
    deleteSmoke(id: $id) {
      id
    }
  }
`

export default function Items() {

  const router = useRouter()

  const [deleteSmoke] = useMutation(DELETE_POST_QUERY)

  const { loading, error, data, refetch, networkStatus } = useQuery(
    ALL_POSTS_QUERY
  )

  const remove = (id) => {
    deleteSmoke({
      variables: {
        id
      },
    })
  }

  if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>

  return (
    <React.Fragment>
      {loading ? <p>Loading...</p> : data.smokes.map(item => {
        return <div className="item">
          <div  className="item-card">
            <div className="item-photo"><img  className="item-photo-img" src={item.smokePhoto}/></div>
              <Link as={`/smoke/${item.id}`} href="/smoke/[DetailSmoke]">
                <div className="item-price">
                  <div>{item.smokeName}</div>
                  <div>{item.smokePrice} zł</div>
                </div>
              </Link>
            </div>
          <div className="item-name">{item.smokeName}</div>
          <div class="custom-btn btn-7"><TiDelete size="40px" color="red" onClick={() => {remove(item.id)}} /></div>
          <div className="item-delete"></div>
        </div>
      })}
    </React.Fragment>
  )
}