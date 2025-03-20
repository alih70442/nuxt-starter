const redirect_payment = (method, action, inputs) => {
  if (method === "GET") {
    window.location.href = action;
    return;
  }

  var form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", action);
  form.setAttribute("target", "_self");

  Object.entries(inputs).forEach(([key, value]) => {

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", value);
    form.appendChild(hiddenField);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export default redirect_payment;
