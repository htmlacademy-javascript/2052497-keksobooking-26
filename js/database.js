const DATA_LOADING_ERROR_MESSAGE = 'Не удалось загрузить данные обьявлений, попробуйте перезагрузить страницу';
const ERROR_MESSAGE_TIMER = 5000;

const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((responce) => {
      if (responce) {
        onSuccess(responce);
      } else {
        onFail(DATA_LOADING_ERROR_MESSAGE, ERROR_MESSAGE_TIMER);
      }
    })
    .catch(() => {
      onFail(DATA_LOADING_ERROR_MESSAGE, ERROR_MESSAGE_TIMER);
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
        onFail(DATA_LOADING_ERROR_MESSAGE);
      }
    });

};

export { sendData, getData };
