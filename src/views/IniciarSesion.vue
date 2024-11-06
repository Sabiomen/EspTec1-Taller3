<template>
    <div class="login-container">
        <div class="login-form">
            <h2>Space Shooter Versus</h2>
            <p>Inicia sesión para la batalla espacial</p>
            <form @submit.prevent="handleSubmit">
                <div class="input-group">
                    <input id="username" v-model="username" type="text" required placeholder="Nombre de usuario"
                        :class="{ 'error': errors.username }">
                </div>
                <div class="input-group">
                    <input id="password" v-model="password" type="password" required placeholder="Contraseña"
                        :class="{ 'error': errors.password }">
                </div>
                <div v-if="errors.username || errors.password" class="error-messages">
                    <p class="error" v-if="errors.username">{{ errors.username }}</p>
                    <p class="error" v-if="errors.password">{{ errors.password }}</p>
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>No tienes cuenta? <router-link to="/register">Crear Cuenta</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            errors: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            this.errors.username = ''
            this.errors.password = ''
            const hasUpperCase = /[A-Z]/.test(this.password);
            const hasLowerCase = /[a-z]/.test(this.password);
            const hasNumber = /[0-9]/.test(this.password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);

            if (this.username.length < 3) {
                this.errors.username = 'El nombre de usuario debe tener al menos 3 caracteres'
            }

            if (this.password.length < 6) {
                this.errors.password = 'La contraseña debe tener al menos 6 caracteres'
            }
            if (!hasUpperCase) {
                    this.errors.password = 'La contraseña debe tener al menos una letra mayúscula';
            } else if (!hasLowerCase) {
                this.errors.password = 'La contraseña debe tener al menos una letra minúscula';
            } else if (!hasNumber) {
                this.errors.password = 'La contraseña debe tener al menos un número';
            } else if (!hasSpecialChar) {
                this.errors.password = 'La contraseña debe tener al menos un carácter especial';
            }

            if (!this.errors.username && !this.errors.password) {
                alert('Inicio de sesión exitoso', { username: this.username, password: this.password })
                this.$router.push('/inicio');
            }
            
        }
    }
}
</script>

<style scoped>
.login-container {
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

.login-container::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: 50px 50px;
}


.login-form {
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
.error{
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
}

button:hover {
    background-color: #2980b9;
}

</style>