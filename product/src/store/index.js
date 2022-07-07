import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from 'sweetalert2'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        baseUrl: "https://94.74.86.174:8080/api",
        username: '',
        checklist: []
    },
    mutations: {
        SET_USERNAME(state, payload) {
            state.username = payload
        },
        SET_CHECKLIST(state, payload) {
            state.checklist = payload
        }
    },
    actions: {
        login(context, payload) {
            axios({
                url: `${this.state.baseUrl}/login`,
                method: 'POST',
                data: payload
            })
                .then((data) => {
                    // console.log(data);
                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('username', data.email)
                    context.commit('SET_USERNAME', data.username)
                    Swal.fire({
                        icon: 'success',
                        title: 'Register Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.messages
                    })
                })
        },
        register(context, newUser) {
            axios({
                url: `${this.state.baseUrl}/register`,
                method: 'POST',
                data: {
                    email: newUser.email,
                    password: newUser.password,
                    username: newUser.username,
                }
            })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Register Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.messages
                    })
                })
        },
        checklistPage(context) {
            axios({
                url: `${this.state.baseUrl}/checklist`,
                method: 'GET',
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
                .then(({ data }) => {
                    context.commit('SET_CHECKLIST', data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        checklistItemPage(context, payload) {
            axios({
                url: `${this.state.baseUrl}/checklist/${id}/item`,
                method: 'GET',
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
                .then(({ data }) => {
                    // console.log(data);
                    context.commit('SET_CHECKLIST', data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        addBookmark(context, id) {
            // console.log(id);
            axios({
                url: `${this.state.baseUrl}/movies/${id}/bookmark`,
                method: 'POST',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(({ data }) => {
                    Swal.fire({
                        icon: 'success',
                        title: `Movie with id ${data.data.movieId} added to bookmark`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch((responseJSON) => {
                    const messages = responseJSON.response.data.messages;
                    console.log(messages)
                    Swal.fire({
                        icon: 'error',
                        title: messages,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        },
        getBookmark(context) {
            axios({
                url: `${this.state.baseUrl}/movies/bookmark`,
                method: 'GET',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(({ data }) => {
                    // console.log(data);
                    context.commit('SET_BOOKMARK', data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        detailMovies(context, id) {
            axios({
                url: `${this.state.baseUrl}/movies/pub/${id}`,
                method: 'GET'
            })
                .then(({ data }) => {
                    // console.log(data);
                    context.commit('SET_MOVIE', data.movie)
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        callMovies ({ commit }) {
            axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=113e90751b8ac8c99e7d2a1e1605d8c4")
            .then(response => {
                // console.log(response);
                commit("loadMovies", response.data.results);
            })
        }
    }
})