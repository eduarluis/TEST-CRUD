<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Listado de usuarios
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Telefono</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody class="table-group-divider" id="content">
                                <tr v-for="(user, i) in users" :key="user.id">
                                    <td>{{ i + 1 }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.phone }}</td>
                                    <td>
                                        {{
                                            user.status ? "Activo" : "Inactivo"
                                        }}
                                    </td>
                                    <td class="text-center">
                                        <button
                                            class="btn btn-warning btn-sm m-1 text-white"
                                            v-on:click="editUser(user)"
                                        >
                                            <i class="fa-solid fa-edit"></i>
                                        </button>

                                        <button
                                            class="btn btn-primary btn-sm m-1 text-white"
                                            v-on:click="changePass(user.id)"
                                        >
                                            <i class="fa-solid fa-key"></i>
                                        </button>

                                        <button
                                            class="btn btn-success btn-sm m-1"
                                            v-on:click="blockUser(user.id)"
                                        >
                                            <i class="fa-solid fa-lock"></i>
                                        </button>

                                        <button
                                            class="btn btn-danger btn-sm"
                                            v-on:click="
                                                deleteUser(user.id, user.name)
                                            "
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getAllUsers,
    confirm,
    sendConfirmation,
    url,
} from "../assets/js/function";

export default {
    name: "List-User",
    data() {
        return { users: null };
    },
    // The `created()` lifecycle hook in a Vue component is called when the component has been created
    // but has not yet been added to the DOM. In this specific case:
    created() {
        this.getUsers();
    },
    methods: {
        // The `async getUsers()` method in the Vue component is responsible for fetching user data from
        // the server using the `getAllUsers()` function. Here's a breakdown of what this method does:
        async getUsers() {
            const retryInterval = 5000; // Tiempo de espera en milisegundos (5 segundos)
            let isConnected = false;

            while (!isConnected) {
                try {
                    const data = await getAllUsers();
                    this.users = data;
                    isConnected = true; // Si la conexión es exitosa, cambia el estado a conectado
                } catch (error) {
                    this.users = null;
                    await new Promise((resolve) =>
                        setTimeout(resolve, retryInterval)
                    ); // Espera antes de reintentar
                }
            }
        },
        // The `deleteUser(id, name)` method in the Vue component is calling the `confirm(id, name)`
        // function. This function is likely used to confirm the deletion of a user with the specified
        // `id` and `name`. The `confirm` function could potentially display a confirmation dialog or
        // perform any necessary actions to confirm the deletion before proceeding with the actual
        // deletion process.
        deleteUser(id, name) {
            confirm(id, name);
        },
        // The `editUser(user)` method in the Vue component is emitting an event named "edit-user" with
        // the `user` object as the payload. This means that when this method is called, it triggers an
        // event that can be listened to by a parent component. The parent component can then respond
        // to this event and take appropriate actions based on the `user` object that was emitted.
        editUser(user) {
            this.$emit("edit-user", user);
        },
        // The `changePass(id)` method in the Vue component is emitting an event named "edit-pass" with
        // the `id` parameter as the payload.
        changePass(id) {
            this.$emit("edit-pass", id);
        },
        // The `blockUser(id)` method in the Vue component is responsible for blocking a user by sending
        // a POST request to a specific API endpoint. Here's a breakdown of what this method does:
        blockUser(id) {
            let path = `${url}/api/v1/user/state/${id}`;

            sendConfirmation("POST", null, path);
        },
    },
};
</script>
