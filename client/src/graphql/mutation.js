import gql from 'graphql-tag'

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id : String!) {
    deleteMovie(id: $id) {
      _id
      title
      overview
    }
  }
`

export const CREATE_MOVIE = gql`
  mutation createMovie($movie : MovieInput!) {
    createMovie(input: $movie) {
      _id
      title
      overview
    }
  }
`
