/**
 * Make the first letter of a string to be a capital letter
 * @param {string} str - String to be capitalised
 */
export function capitalise(str = '') {
  return str[0]?.toUpperCase() + str?.slice(1);
}

export function onChangeInput({ target: { name, value } }, state, setState) {
  delete state?.validationErrors?.[name]; // Remove the error if user updates the field
  setState((prevState) => ({ ...prevState, [name]: value })); // Update user input
}

export function submitForm(
  event,
  validate = () => {},
  values = {},
  setState = () => {}
) {
  event.preventDefault(); // Prevent the default action
  let errors = validate(values);
  setState((prevState) => ({
    ...prevState,
    validationErrors: {
      ...prevState.validationErrors,
      ...errors
    },
    isLoading: Object.keys(errors).length ? false : true
  }));
}
