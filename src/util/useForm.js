import { useState, useEffect } from 'react';

const useForm = (callback, validate, label) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
      // console.log(values)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, isSubmitting, callback]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values, event.target.name, label));
  };

  const onSuccess = () => {
    setIsSubmitting(false);
    setValues({});
  };

  const handleChange = (event) => {
    event.persist();

    setValues((values) => {
      const tempValues = {
        ...values,
        [event.target.name]: event.target.value,
      };

      return tempValues;
    });
    setErrors((error) => ({ ...error, [event.target.name]: '' }));
  };

  return {
    handleChange,
    handleSubmit,
    onSuccess,
    values,
    errors,
    isSubmitting,
  };
};

export default useForm;
