const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const checkAndInsertImage = (from, to) => {
  const file = from.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    to.src = URL.createObjectURL(file);
  }
};

const avatarFile = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');
const DEFAULT_AVATAR = previewAvatar.src;


avatarFile.addEventListener('change', () => {
  checkAndInsertImage(avatarFile, previewAvatar);
});

const imageFile = document.querySelector('#images');
const previewImage = document.querySelector('.ad-form__photo').querySelector('img');
const DEFAULT_IMAGE = previewImage.src;


imageFile.addEventListener('change', () => {
  checkAndInsertImage(imageFile, previewImage);
});

const resetImage = () => {
  previewAvatar.src = DEFAULT_AVATAR;
  previewImage.src = DEFAULT_IMAGE;
};

export{resetImage};
