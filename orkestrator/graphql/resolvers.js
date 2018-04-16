const axios = require('axios')

const resolvers = {
  Query: { 
    movies: async () => {
      const movies = await axios.get('http://localhost:3001/movies')
      return movies.data.data
    },
    tvs: async () => {
      const tvs = await axios.get('http://localhost:3002/tvs')
      return tvs.data.data
    }
  },
  Mutation: {
    createMovie:  async (_, { input }) =>  {
      const newMovie =  await axios.post('http://localhost:3001/movies',input)
      return newMovie.data.data
    },
    deleteMovie:  async (_, { id }) =>  {
      const deletedMovie =  await axios.delete('http://localhost:3001/movies/' + id)
      return deletedMovie.data.data
    }
  }
}

module.exports = resolvers
