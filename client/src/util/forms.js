export const serializeFormData = (form) => {
  const formData = new FormData(form);

  return Array.from(formData.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};
