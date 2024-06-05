<template>
    <div class="row mt-3">
        <div class="col-lg-4">
            <!-- // The `<user-form-component :user-to-edit="userToEdit"
            // :user-to-edit-pass="userToEditPass"></user-form-component>` line in the Vue template is
            // passing the `userToEdit` and `userToEditPass` data properties to the
            // `user-form-component` as props. -->

            <user-form-component
                :user-to-edit="userToEdit"
                :user-to-edit-pass="userToEditPass"
            ></user-form-component>
        </div>
        <div class="col-lg-8">
            <!-- // The `<list-user @edit-user="handleEditUser" @edit-pass="handleEditPass"></list-user>` line in
            // the Vue template is setting up event listeners for two custom events: `edit-user` and
            // `edit-pass`. -->
            <list-user
                @edit-user="handleEditUser"
                @edit-pass="handleEditPass"
            ></list-user>
        </div>
    </div>
</template>

<script>
import ListUser from "@/views/ListView.vue";
import FormUser from "@/components/UserFormComponent.vue";

export default {
    components: {
        "user-form-component": FormUser,
        "list-user": ListUser,
    },
    data() {
        return {
            userToEdit: null,
            userToEditPass: null,
        };
    },
    methods: {
        // The `handleEditUser` method in the Vue component is setting the `userToEdit` data
        // property to the `user` object that is passed as a parameter to the method. This method is
        // triggered when an event named `edit-user` is emitted from the `list-user` component. The
        // `user` object contains information about the user being edited, and by setting
        // `this.userToEdit = user;`, the component updates the `userToEdit` property with the
        // details of the user that is being edited. This updated property can then be used within
        // the component or passed down to child components for further processing or display.
        handleEditUser(user) {
            this.userToEdit = user;
        },
        // The `handleEditPass` method in the Vue component is setting the `userToEditPass` data
        // property to the `id` that is passed as a parameter to the method. This method is
        // triggered when an event named `edit-pass` is emitted from the `list-user` component. The
        // `id` value is then stored in the `userToEditPass` property, which can be used elsewhere
        // in the component or passed down to child components as needed.
        handleEditPass(id) {
            this.userToEditPass = id;
        },
    },
};
</script>
