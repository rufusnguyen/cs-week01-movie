<template>
    <div id="app">
        <h1>IMDB movies:</h1>
        <div class="nav">
            <button v-on:click="reloadMovies('vote_average.asc')">Lowest rated</button>
            <button v-on:click="reloadMovies('vote_average.desc')">Highest rated</button>
        </div>
        <ul>
            <li v-for="(movie, index) in movies" v-bind:key="movie.id" v-if="index < 15">
                <span
                    v-bind:class="{'recommend-title': movie.vote_average > 8.2}"
                    v-bind:style="{color: movie.color}">{{movie.title}}</span>
                <span>{{movie.vote_average}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import Color from 'color'
import MovieMixin from '@/mixins/movieMixin'

const VOTING_CONCEPT_COLOR = Color('blue')

export default {
    name: 'Movie',
    mixins: [MovieMixin],
    data () {
        return {
            movies: null
        }
    },
    methods: {
        reloadMovies(sortField) {
            this.searchMovie(sortField).then((data) => {
                this.movies = data.results;
                this.movies.forEach(movie => {
                    movie.color = VOTING_CONCEPT_COLOR.lighten(movie.vote_average);
                });
        });
        }
    },
    mounted() {
        if (!this.movies) {
            this.searchMovie().then((data) => {
                this.movies = data.results;
            });
        }
    },
}
</script>
<style>
.recommend-title {
    background-color: blue;
}
</style>
