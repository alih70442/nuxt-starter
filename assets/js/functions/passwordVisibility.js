function toggle_password_visibility($event, input) {
  const eye = $event.target;

  if (input.getAttribute("type") === "text") {
    input.setAttribute("type", "password");
    eye.classList.remove("icon2-eye");
    eye.classList.add("icon2-eye");
  } else {
    input.setAttribute("type", "text");
    eye.classList.remove("icon2-eye-slash");
    eye.classList.add("icon2-eye-slash");
  }
}

export default toggle_password_visibility;