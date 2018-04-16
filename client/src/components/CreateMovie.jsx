import React, { Component} from 'react'
import { CREATE_MOVIE } from '../graphql/mutation'
import { GET_MOVIES } from '../graphql/query'
import { Mutation } from 'react-apollo'

class CreateMovie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      overview: ''
    }
  }

  submitForm = () => {
    
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { title, overview } = this.state
    return (
      <div className="create-movie row" style={{ marginTop: '30px', marginBottom: '30px' }}>
        <div className="col-md-4 offset-md-4">
          <div className="form-group">
            <input type="text" className="form-control" name="title" value={ title } onChange={ this.handleChange } placeholder="Movie Title" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="overview" onChange={ this.handleChange } value={ overview } placeholder="Movie Overview" />
          </div>
          <Mutation 
            mutation={CREATE_MOVIE} 
            update={ (cache, {data: { createMovie }} ) => {
              const { movies } = cache.readQuery({ query: GET_MOVIES })
              cache.writeQuery({
                query: GET_MOVIES,
                data: { movies: movies.concat([createMovie]) }
                  })
            }}
          >
          { createMovie => (

            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={ () => createMovie({ variables: { movie: { title, overview }  } })}>
              Create New Movie
            </button>
            )
            
          }
          </Mutation>
        </div>
      </div>
    );
  }
}

export default CreateMovie;
