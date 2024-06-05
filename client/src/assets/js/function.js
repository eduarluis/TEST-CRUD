import Swal from "sweetalert2";
import axios from "axios";

export var url = `http://localhost:3000`;

/**
 * The function `show_alert` displays a popup alert message with a specified message, icon, and
 * optional focus on an element.
 * @param msg - The `msg` parameter is a string that represents the message you want to display in the
 * alert.
 * @param icon - The `icon` parameter in the `show_alert` function is used to specify the icon that
 * will be displayed in the alert. It can be set to values like "success", "error", "warning", "info",
 * etc., to indicate the type of message being shown in the alert.
 * @param [focus] - The `focus` parameter in the `show_alert` function is used to specify the ID of an
 * element that should receive focus after displaying the alert. If a value is provided for the `focus`
 * parameter, the function will attempt to focus on the element with the corresponding ID using
 * `document.getElementById("
 */
export const show_alert = (msg, icon, focus = "") => {
    if (focus !== "") document.getElementById("focus").focus();

    Swal.fire({
        title: msg,
        icon,
        customClass: {
            confirmButton: "btn btn-primary",
            popup: "animated zoomIn",
        },
        buttonsStyling: false,
    });
};

/**
 * The function `getAllUsers` asynchronously fetches all users from a specified API endpoint and
 * returns the user data.
 * @returns The function `getAllUsers` is returning the data property of the response from the API call
 * to fetch all users.
 */
export const getAllUsers = async () => {
    const users = await axios.get(`${url}/api/v1/user`);
    return users.data.data;
};

/**
 * The `confirm` function uses SweetAlert to display a confirmation dialog for deleting a user with the
 * specified ID and name.
 * @param id - The `id` parameter in the `confirm` function represents the unique identifier of a user.
 * It is used to construct the API endpoint path for deleting a user with the specified `id`.
 * @param name - The `name` parameter in the `confirm` function represents the name of the user or item
 * that is being considered for deletion. It is used to display a confirmation message to the user
 * asking if they are sure they want to delete the item with that specific name.
 */
export const confirm = (id, name) => {
    const path = `${url}/api/v1/user/${id}`;

    const swalWithBootstrapBootom = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success me-3",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    swalWithBootstrapBootom
        .fire({
            title: `seguro que deseas eliminar ${name}`,
            text: "se perdera la informacion",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "<i class='fa-solid fa-check'></i> Si, eliminar",
            cancelButtonText: "<i class='fa-solid fa-ban'></i> Cancelar",
        })
        .then((res) => {
            if (res.isConfirmed) {
                sendConfirmation("DELETE", { id }, path);
            } else {
                show_alert("Operacion cancelada", "info");
            }
        });
};

/**
 * The function `sendConfirmation` sends a request using the specified method, parameters, and URL, and
 * handles the response accordingly by displaying a success message or an error message.
 * @param method - The `method` parameter in the `sendConfirmation` function is the HTTP method to be
 * used for the request, such as 'GET', 'POST', 'PUT', or 'DELETE'.
 * @param params - The `params` parameter in the `sendConfirmation` function is typically an object
 * containing data that needs to be sent along with the request. It could include information such as
 * user details, confirmation data, or any other relevant information required by the server to process
 * the request successfully.
 * @param url - The `url` parameter in the `sendConfirmation` function is the endpoint URL where the
 * confirmation request will be sent. It specifies the location where the axios request will be made to
 * send the confirmation data.
 */
export const sendConfirmation = (method, params, url) => {
    axios({ method, url, data: params })
        .then((res) => {
            var message = res.data.message;

            var status = res.data.status;
            if (status) {
                show_alert(message, 'success');
                window.setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                show_alert('No se puedo eliminar el usuario', "error");
            }
        })
        .catch((err) => {
            console.log(err.response.data.message)
            show_alert(err.response.data.message, "error");
        });
};
