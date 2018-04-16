import React from 'react';
import gql from "graphql-tag";
import {  Query } from "react-apollo";
import ButtonDelete from './ButtonDelete'
import { GET_MOVIES } from '../graphql/query'

function MovieList({...props}) {
  return (
    <div className="movie-list">
        <Query 
          query={GET_MOVIES}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.movies.slice(0).reverse().map((movie, i) => (
              <div key={i}>
                <h5>{ movie.title ? movie.title: 'No Title' }</h5>
                <p>{ movie.overview ? movie.overview : 'No Overview' }</p>
                <ButtonDelete id={movie._id } />
              </div>
            ))
          }}
        </Query>
      
    </div>
  );
}


export default MovieList;
