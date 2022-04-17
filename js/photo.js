const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooserAvatarElement = document.querySelector('.ad-form__field input[type=file]');
const previewAvatarElement = document.querySelector('.ad-form-header__preview img');
const fileChooserPhotoElement = document.querySelector('.ad-form__upload input[type=file]');
const previewHousingPhotoElement = document.querySelector('.ad-form__photo');

fileChooserAvatarElement.addEventListener('change', () => {
  const file = fileChooserAvatarElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatarElement.src = URL.createObjectURL(file);
  }
});

fileChooserPhotoElement.addEventListener('change', () => {
  const photoElement =  document.createElement('img');
  photoElement.alt = 'Фотография жилья';
  photoElement.width = 70;
  photoElement.height = 70;
  previewHousingPhotoElement.appendChild(photoElement);

  const file = fileChooserPhotoElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));


  if (matches) {
    photoElement.src = URL.createObjectURL(file);
  }
});
