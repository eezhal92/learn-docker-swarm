new Vue({
  el: '#app',
  data () {
    return {
      title: 'Peminjaman Ruang',
      users: [
        { id: 'user-1', name: 'Jennie' }
      ],
      status: {
        success: false,
        message: '',
      },
      form: {
        userId: 'user-1',
        roomId: 'room-1',
        date: '2018-12-12',
        shiftId: 'shift-1',
      },
    }
  },
  mounted () {
    this.fetchUsers()
  },
  methods: {
    resetStatus () {
      this.status = {
        message: '',
        success: false,
      }
    },
    handleSubmit () {
      this.resetStatus()

      const { roomId } = this.form
      const headers = new Headers({
        'Content-Type': 'application/json'
      })

      return axios.post(`http://localhost:5001/rooms/${roomId}/bookings`, this.form)
        .then(response => response.data)
        .then((data) => {
          this.status = {
            success: true,
            message: 'Thanks!'
          }
        })
        .catch((err) => {
          let status = {
            success: false,
            message: 'Failed'
          }

          if (err.response && err.response.message) {
            status.message = err.response.message
          } else {
            console.log('h')
            status.message = err.message
          }

          this.status = status
        })
    },
    fetchUsers () {
      return fetch('http://localhost:5000/users')
        .then(response => response.json())
        .then(data => {
          this.users = data.users
        })
    }
  }
})
