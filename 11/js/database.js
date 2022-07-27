const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((responce) => {
      if (responce) {
        onSuccess(responce);
      } else {
        onFail('Не удалось загрузить данные обьявлений, попробуйте перезагрузить страницу');
      }
    })
    .catch(() => {
      onFail('Не удалось загрузить данные обьявлений, попробуйте перезагрузить страницу');
    });
};

const sendData = (onSuccess, onFail, formData) => {
  fetch('https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    });

};

export { sendData, getData };
