const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewHousingPhoto = document.querySelector('.ad-form__photo');

fileChooserPhoto.addEventListener('change', () => {
  const photo =  document.createElement('img');
  photo.alt = 'Фотография жилья';
  photo.width = 60;
  photo.height = 60;
  previewHousingPhoto.appendChild(photo);

  const file = fileChooserPhoto.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));


  if (matches) {
    photo.src = URL.createObjectURL(file);
  }
});
