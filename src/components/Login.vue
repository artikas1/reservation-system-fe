<template>
  <v-app id="inspire">
    <!-- Ensure the content takes up the full height of the viewport -->
    <v-content class="app-container" style="height: 100vh;">
      <!-- Use a fluid container that fills the height and centers its content -->
      <v-container fluid fill-height>
        <!-- Center the layout both vertically and horizontally -->
        <v-layout align-center>
          <!-- Adjust the flex width for responsiveness -->
          <v-flex xs12 sm8 md6 lg4>
            <!-- Login card with a minimum width for better appearance -->
            <v-card class="elevation-12" style="min-width: 400px;">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="email"
                    prepend-icon="person"
                    name="email"
                    label="Email"
                    type="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        // Send a login request to the backend
        const response = await axios.post('http://localhost:8080/auth/login', {
          email: this.email,
          password: this.password,
        });

        // Extract the JWT token from the response
        const token = response.data.token;

        // Store the token in local storage
        localStorage.setItem('jwtToken', token);

        // Redirect to the home page or a protected route
        this.$router.push('/home');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    },
  },
};
</script>

<style>
.app-container {
  background: rgb(38, 70, 82);
  background: linear-gradient(147deg, rgba(38, 70, 82, 1) 0%, rgba(39, 66, 75, 1) 40%, rgba(0, 80, 106, 1) 100%);
  min-height: 100%; /* Set a minimum height to cover the entire viewport */
}
</style>
