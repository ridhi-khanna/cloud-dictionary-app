// ====================== Cognito Auth JS ======================

// Replace these values with your actual Cognito app details
const CLIENT_ID = "51kvv1j8nok5fds03533d8pcdp";
const COGNITO_DOMAIN = "https://ap-south-1gchn9l0ql.auth.ap-south-1.amazoncognito.com"; // e.g., myapp.auth.ap-south-1.amazoncognito.com
const REDIRECT_URI = "https://ridhi-khanna.github.io/cloud-dictionary-app/index.html";       // e.g., https://username.github.io/dictionary/index.html

// Extract id_token from URL or localStorage
function getIdToken() {
    const hash = window.location.hash.substring(1); // remove #
    const params = new URLSearchParams(hash);
    let token = params.get("id_token") || localStorage.getItem("idToken");

    if (params.get("id_token")) {
        localStorage.setItem("idToken", token);  // store for reloads
        window.location.hash = "";               // clean URL
    }

    return token;
}

let idToken = getIdToken();

// Redirect to Cognito login if no token
if (!idToken) {
    window.location.href = "https://ap-south-1gchn9l0ql.auth.ap-south-1.amazoncognito.com/login?client_id=51kvv1j8nok5fds03533d8pcdp&response_type=token&scope=openid&redirect_uri=https://ridhi-khanna.github.io/cloud-dictionary-app/index.html";
}

// Helper to attach JWT to API requests
function attachAuth(xhr) {
    if (!idToken) return;
    xhr.setRequestHeader("Authorization", "Bearer " + idToken);
}

// Logout function
function logout() {
    localStorage.removeItem("idToken");
    window.location.href = "https://ap-south-1gchn9l0ql.auth.ap-south-1.amazoncognito.com/logout?client_id=51kvv1j8nok5fds03533d8pcdp&logout_uri=https://ridhi-khanna.github.io/cloud-dictionary-app/index.html";
}