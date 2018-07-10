export default {
    methods: {
        searchMovie: function(customSortByField) {
            let sortField = 'popularity.desc';
            if (customSortByField) {
                sortField = customSortByField;
            }
            return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d993bdf37f8ab7c574c990434a85a69f&sort_by=${sortField}`).then(function (response) {
                return response.json()
            })
        }
    }
}