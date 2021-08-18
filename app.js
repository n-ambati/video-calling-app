async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(device => device.kind === type);
}

async function openCamera(cameraId, minWidth, minHeight) {
  const constraints = {
    'video': {
      'deviceId': cameraId,
      'width': { 'min': minWidth },
      'height': { 'min': minHeight },
    },
    'audio': {
      'echoCancellation': true,
    },
  }

  return await navigator.mediaDevices.getUserMedia(constraints);
}

const videoElement = document.querySelector('video#localVideo');
// openCamera()
//     .then(stream => {
//         videoElement.srcObject = stream;
//     })


(async function() {
  const cameras = await getConnectedDevices('videoinput');

  if (cameras && cameras.length > 0) {
    const stream = await openCamera(cameras[0].deviceId, 1280, 720);
    videoElement.srcObject = stream;
  }
})();
