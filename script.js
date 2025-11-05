const imageInput = document.getElementById('imageInput');
const originalImage = document.getElementById('originalImage');
const compressedImage = document.getElementById('compressedImage');
const originalSize = document.getElementById('originalSize');
const compressedSize = document.getElementById('compressedSize');
const downloadLink = document.getElementById('downloadLink');
const qualitySlider = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');

let imageFile;

qualitySlider.addEventListener('input', (e) => {
    qualityValue.textContent = e.target.value;
    if (imageFile) {
        compressImage();
    }
});

imageInput.addEventListener('change', (e) => {
    imageFile = e.target.files[0];
    if (imageFile) {
        originalImage.src = URL.createObjectURL(imageFile);
        originalSize.textContent = `Original Size: ${(imageFile.size / 1024 / 1024).toFixed(2)} MB`;
        compressImage();
    }
});

async function compressImage() {
    if (!imageFile) return;

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: parseFloat(qualitySlider.value)
    }

    try {
        const compressedFile = await imageCompression(imageFile, options);
        compressedImage.src = URL.createObjectURL(compressedFile);
        compressedSize.textContent = `Compressed Size: ${(compressedFile.size / 1024).toFixed(2)} KB`;
        downloadLink.href = compressedImage.src;
        downloadLink.style.display = 'block';
    } catch (error) {
        console.error(error);
    }
}
