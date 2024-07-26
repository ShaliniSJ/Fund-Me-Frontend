export async function getFormData(form: HTMLFormElement) {
  const formData = new FormData(form);
  let data: any = {};

  formData.forEach((value, name) => {
    const element = form.elements.namedItem(name) as HTMLInputElement;
    if (element) {
      data = { ...data, [name]: element.value };
    }
  });

  return data;
}
