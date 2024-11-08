<template>
  <div class="create-account-container">
    <div class="create-account-form">
      <h2>Space Shooter Versus</h2>
      <p>Crea tu cuenta para la batalla espacial</p>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <input id="username" v-model="username" type="text" required placeholder="Nombre de usuario"
            :class="{ 'error': errors.username }">
        </div>
        <div class="input-group">
          <input id="email" v-model="email" type="email" required placeholder="Correo electrónico"
            :class="{ 'error': errors.email }">
        </div>
        <div class="input-group">
          <input id="password" v-model="password" type="password" required placeholder="Contraseña"
            :class="{ 'error': errors.password }">
        </div>
        <div class="input-group">
          <input id="confirmPassword" v-model="confirmPassword" type="password" required
            placeholder="Confirmar contraseña" :class="{ 'error': errors.confirmPassword }">
        </div>
        <div v-if="Object.values(errors).some(error => error)" class="error-messages">
          <div v-for="(error, key) in errors" :key="key">
            <p class="error" v-if="error">{{ error }}</p>
          </div>
        </div>
        <button type="submit">Crear Cuenta</button>
      </form>
      <p>¿Ya tienes una cuenta? <router-link to="/">Iniciar Sesión</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      this.clearErrors()

      this.validateUsername()
      this.validateEmail()
      this.validatePassword()
      this.validateConfirmPassword()

      if (!Object.values(this.errors).some(error => error)) {
        const newUser = {
          username: this.username,
          email: this.email,
          password: this.password
        };
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Cuenta creada exitosamente')
        this.$router.push('/wiki-juego-disparos/')
      }
    },
    clearErrors() {
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = ''
      })
    },
    validateUsername() {
      if (this.username.length < 3) {
        this.errors.username = 'El nombre de usuario debe tener al menos 3 caracteres'
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.email)) {
        this.errors.email = 'Por favor, introduce un correo electrónico válido'
      }
    },
    validatePassword() {
      if (this.password.length < 6) {
        this.errors.password = 'La contraseña debe tener al menos 6 caracteres'
      } else if (!/[A-Z]/.test(this.password)) {
        this.errors.password = 'La contraseña debe tener al menos una letra mayúscula'
      } else if (!/[a-z]/.test(this.password)) {
        this.errors.password = 'La contraseña debe tener al menos una letra minúscula'
      } else if (!/[0-9]/.test(this.password)) {
        this.errors.password = 'La contraseña debe tener al menos un número'
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.password)) {
        this.errors.password = 'La contraseña debe tener al menos un carácter especial'
      }
    },
    validateConfirmPassword() {
      if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'Las contraseñas no coinciden'
      }
    }
  }
}
</script>

<style scoped>
.create-account-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #000;
  background-image: url('@/assets/background2.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.create-account-form {
  background-color: rgba(23, 32, 42, 0.7);
  padding: 4%;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(5px);
}

h2 {
  color: #fff;
  margin-top: 5px;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

p {
  color: #3498db;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.error {
  color: #cd0c02;
  margin-bottom: 0;
  font-size: 1rem;
}

.input-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding-left: 0.75rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border: 1px solid #2c3e50;
  border-radius: 5px;
  background-color: rgba(44, 62, 80, 0.7);
  color: #fff;
  font-size: 1rem;
}

input::placeholder {
  color: #bdc3c7;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

input.error {
  border-color: #e74c3c;
}

.error-messages {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

button {
  width: 104%;
  padding-left: 0.75rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

button:hover {
  background-color: #2980b9;
}
</style>