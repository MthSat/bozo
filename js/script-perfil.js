window.onload = () => {
  if (google && google.accounts && google.accounts.id) {
    google.accounts.id.initialize({
      client_id: "266232936590-bedibnbpg17a66u9in6gtb4v4o7jh2n3.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("g_id_signin"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt(); // opcional
  } else {
    console.error("Google Identity Services não foi carregado.");
  }
};

function handleCredentialResponse(response) {
  console.log("Token de login Google:", response.credential);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof google === "undefined") {
    console.error("Google Identity Services não foi carregado.");
    return;
  }

  // Inicializa com seu client_id
  google.accounts.id.initialize({
    client_id: "266232936590-bedibnbpg17a66u9in6gtb4v4o7jh2n3.apps.googleusercontent.com.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });

  // Renderiza o botão
  google.accounts.id.renderButton(
    document.getElementById("googleSignInDiv"),
    { theme: "outline", size: "large" }
  );

  // Opcional: solicita login automático
  // google.accounts.id.prompt();
});

// Callback ao fazer login
function handleCredentialResponse(response) {
  const jwt = response.credential;
  const payload = parseJwt(jwt);

  document.getElementById("perfil").innerHTML = `
    <h2>Olá, ${payload.name}!</h2>
    <p>Email: ${payload.email}</p>
    <img src="${payload.picture}" alt="Foto de perfil" style="border-radius: 50%;">
  `;
}

// Função para decodificar o token JWT
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(atob(base64).split("").map(c =>
    "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(""));

  return JSON.parse(jsonPayload);
}
