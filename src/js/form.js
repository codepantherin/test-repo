const VALIDATORS = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address."),
  message: (v) =>
    v.trim().length >= 10 ? "" : "Message must be at least 10 characters.",
};

const PLACEHOLDER_ENDPOINT = null;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const fields = Object.keys(VALIDATORS);

  const setStatus = (message, variant = "") => {
    if (!status) return;
    status.textContent = message;
    status.className = variant
      ? `text-sm text-center ${variant}`
      : "text-sm text-center";
  };

  const setError = (name, message) => {
    const el = form.querySelector(`[data-error-for="${name}"]`);
    const field = form.elements[name];
    if (el) {
      el.textContent = message;
      el.classList.toggle("hidden", !message);
    }
    if (field) field.setAttribute("aria-invalid", message ? "true" : "false");
  };

  const validateField = (name) => {
    const validate = VALIDATORS[name];
    const field = form.elements[name];
    if (!validate || !field) return true;
    const message = validate(field.value);
    setError(name, message);
    return !message;
  };

  const clearErrors = () => fields.forEach((name) => setError(name, ""));

  form.addEventListener("input", (event) => {
    const { name } = event.target;
    if (VALIDATORS[name]) validateField(name);
  });

  form.addEventListener("blur", (event) => {
    const { name } = event.target;
    if (VALIDATORS[name]) validateField(name);
  }, true);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const isValid = fields.reduce(
      (acc, name) => validateField(name) && acc,
      true
    );

    if (!isValid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      setStatus("Please fix the highlighted fields.", "text-red-600");
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    setStatus("Sending\u2026");

    try {
      if (PLACEHOLDER_ENDPOINT) {
        const response = await fetch(PLACEHOLDER_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      } else {
        await sleep(600);
      }

      clearErrors();
      form.reset();
      setStatus("Thanks \u2014 I'll get back to you soon.", "text-emerald-600");
    } catch {
      setStatus(
        "Something went wrong. Please email me directly.",
        "text-red-600"
      );
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
