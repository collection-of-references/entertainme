import gql from "graphql-tag";

export const GET_MOVIES = gql`
  { 
    movies {
      _id
      title
      overview
    } 
  }
  `
