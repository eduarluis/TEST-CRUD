<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    {{textBtn}} {{title}} 
                </div>
                <div class="card-body">
                    <form @submit.prevent="handleSubmit" v-if="changeFormPass">
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                              <i class="fa-solid fa-circle-user"></i>
                            </span>
                            <input type="text" v-model="name" id="name" name="name" class="form-control" required placeholder="Nombre">
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text">
                              <i class="fa-solid fa-envelope"></i>
                            </span>
                            <input type="text" v-model="email" id="email" name="email" class="form-control" required placeholder="Correo electronico">
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text">
                              <i class="fa-solid fa-phone"></i>
                            </span>
                            <input type="text" v-model="phone" id="phone" name="phone" class="form-control" required placeholder="Telefono">
                        </div>

                        <div class="input-group mb-3" v-if="showPassword">
                            <span class="input-group-text">
                              <i class="fa-solid fa-key"></i>
                            </span>
                            <input type="password" v-model="password" id="password" name="password" class="form-control" required placeholder="Contraseña">
                        </div>

                        <div class="input-group mb-3">
                            <button type="buttom" class="btn btn-primary w-100">{{textBtn}}</button>
                        </div>

                    </form>

                     <form @submit.prevent="handleSubmitPass" v-if="!changeFormPass">
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                              <i class="fa-solid fa-key"></i>
                            </span>
                            <input type="password" v-model="password" id="password" name="password" class="form-control" required placeholder="Contraseña">
                        </div>

                        <div class="input-group mb-3">
                            <button type="buttom" class="btn btn-primary w-100">{{textBtn}}</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { sendConfirmation } from '../assets/js/function';

    export default {
        name :"form-user-component",
        data()
        {
            return {
                showPassword : true,
                textBtn: 'Crear',
                title : `Usuario`,
                update : false,
                changeFormPass: true,

                id: "",
                name : '',
                email : '',
                password : '',
                phone : '',
            }
        },
        methods: {
            // The `handleSubmit()` method in the Vue component is responsible for handling the form
            // submission when the user is creating or updating a user. Here's a breakdown of what it
            // does:
            handleSubmit()
            {
                const userData = this.collectFormData();

                var url = `http://localhost:3000/api/v1/user`;

                if(this.update)
                {
                    sendConfirmation('PATCH',userData,`${url}/${this.id}`);
                }else{
                    sendConfirmation('POST',userData,url);
                }
            },
           // The `handleSubmitPass()` method in the Vue component is responsible for handling the form
           // submission when the user is changing their password. Here's a breakdown of what it does:
            handleSubmitPass()
            {
                const userData = this.collectFormData();

                var url = `http://localhost:3000/api/v1/user/change-password/${this.id}`;

                sendConfirmation('POST',userData,url);
            },
            // The `collectFormData()` method in the Vue component is a function that gathers form data
            // from the component's data properties. It creates an object containing the values of
            // `name`, `email`, `password`, and `phone` properties from the component's data. This
            // function is used to collect the user input data from the form fields before submitting
            // the form data to the server.
            collectFormData()
            {
                return {
                    name : this.name,
                    email : this.email,
                    password : this.password,
                    phone : this.phone,
                }
            }
        },
        props: ['userToEdit','userToEditPass'],
        watch: {
            // The `userToEdit` watcher in the Vue component is set to run immediately (`immediate:
            // true`) and it watches for changes in the prop `userToEdit`. When `userToEdit` changes,
            // the `handler` function is executed. Inside the `handler` function, it updates the
            // component's data properties based on the new `userToEdit` value. It sets the `id`,
            // `name`, `email`, and `phone` properties to the corresponding values from `newValue`. It
            // also sets `showPassword` to `false`, `update` to `true`, `textBtn` to 'Actualizar', and
            // `changeFormPass` to `true`. This allows the component to update its state and UI based
            // on the changes in the `userToEdit` prop.
            userToEdit: {
                immediate: true,
                handler(newValue) {
                    if (newValue) {
                        this.id = newValue.id;
                        this.name = newValue.name;
                        this.email = newValue.email;
                        this.phone = newValue.phone;
                        this.showPassword = false;
                        this.update = true;
                        this.textBtn = 'Actualizar';
                        this.changeFormPass = true;
                    }
                }
            },
           // The `userToEditPass` watcher in the Vue component is set to run immediately (`immediate:
           // true`) and it watches for changes in the prop `userToEditPass`. When `userToEditPass`
           // changes, the `handler` function is executed.
            userToEditPass: {
                immediate: true,
                handler(newVal) {
                    if (newVal) {
                        this.id = newVal;
                        this.changeFormPass = false;
                        this.showPassword = true;
                    }
                }
            }
        }
    }
</script>