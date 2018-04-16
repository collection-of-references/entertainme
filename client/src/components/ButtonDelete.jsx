import React from 'react';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { DELETE_MOVIE } from '../graphql/mutation'
import { GET_MOVIES } from '../graphql/query'

function ButtonDelete(props) {
  const { id } = props
  return (
    <div className="btn-delete">
      <Mutation 
        mutation={DELETE_MOVIE} 
        update={ (cache) => {
          const { movies } = cache.readQuery({query: GET_MOVIES })
          const deletedMovies = movies.filter( movie => {
            return movie._id !== id
          })
          cache.writeQuery({
            query: GET_MOVIES,
            data: { movies: deletedMovies }
          })
        } }
      >
      { (deleteMovie, {data}) => (
          <button className="btn btn-danger" onClick={() => deleteMovie({ variables: { id: id } }) }  >
            Delete 
          </button>
        )
      }
      </Mutation>
    </div>
  );
}


export default ButtonDelete;
