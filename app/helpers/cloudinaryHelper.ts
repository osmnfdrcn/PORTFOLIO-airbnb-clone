const cloudName = "dx9edul8i";
const uploadPreset = "yu4jqpqr";
const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`;

export const makeUploadRequest = ({
  file,
  fieldName,
  progressCallback,
  successCallback,
  errorCallback,
}: any) => {
  const url = `${baseUrl}/image/upload`;

  const formData = new FormData();
  formData.append(fieldName, file);
  console.log({ file });

  formData.append("upload_preset", uploadPreset);
  const request = new XMLHttpRequest();
  request.open("POST", url);
  request.upload.onprogress = (e) => {
    progressCallback(e.lengthComputable, e.loaded, e.total);
  };

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      const { delete_token: deleteToken } = JSON.parse(request.response);
      successCallback(deleteToken);
    } else {
      errorCallback(request.responseText);
    }
  };

  request.send(formData);

  return () => {
    request.abort();
  };
};

export const makeDeleteRequest = ({
  token,
  successCallback,
  errorCallback,
}: any) => {
  const url = `${baseUrl}/delete_by_token`;

  const request = new XMLHttpRequest();
  request.open("POST", url);

  request.setRequestHeader("Content-Type", "application/json");

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      successCallback();
    } else {
      errorCallback(request.responseText);
    }
  };
  request.send(JSON.stringify({ token }));
};
