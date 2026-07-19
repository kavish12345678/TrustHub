import { useCallback, useState } from "react";

/**
 * Generic controlled form hook with validation + submit handling.
 */
export function useAuthForm({
  initialValues,
  validate,
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(0);

  const setValue = useCallback((name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }, []);

  const handleChange = useCallback(
    (event) => {
      const { name, type, checked, value } = event.target;
      setValue(name, type === "checkbox" ? checked : value);
    },
    [setValue]
  );

  const handleBlur = useCallback(
    (event) => {
      const { name } = event.target;
      setTouched((current) => ({ ...current, [name]: true }));

      const nextErrors = validate(values);
      if (nextErrors[name]) {
        setErrors((current) => ({ ...current, [name]: nextErrors[name] }));
      }
    },
    [validate, values]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const nextErrors = validate(values);
      setErrors(nextErrors);
      setTouched(
        Object.keys(values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );

      if (Object.keys(nextErrors).length > 0) {
        setShake((n) => n + 1);
        return { ok: false, errors: nextErrors };
      }

      setSubmitting(true);
      try {
        const result = await onSubmit(values);
        return { ok: true, result };
      } catch (error) {
        setShake((n) => n + 1);
        const message = error?.message || "Something went wrong";
        setErrors((current) => ({ ...current, form: message }));
        return { ok: false, error };
      } finally {
        setSubmitting(false);
      }
    },
    [onSubmit, validate, values]
  );

  const fieldError = useCallback(
    (name) => (touched[name] ? errors[name] : undefined),
    [touched, errors]
  );

  return {
    values,
    errors,
    touched,
    submitting,
    shake,
    setValue,
    handleChange,
    handleBlur,
    handleSubmit,
    fieldError,
    setErrors,
  };
}

export default useAuthForm;
