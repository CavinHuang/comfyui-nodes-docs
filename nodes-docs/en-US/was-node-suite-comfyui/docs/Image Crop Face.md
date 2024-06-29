---
tags:
- Crop
- Image
- ImageTransformation
---

# Image Crop Face
## Documentation
- Class name: `Image Crop Face`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node specializes in detecting and cropping faces within images, optionally applying a padding around the detected face area for better framing. It leverages facial detection algorithms to identify the most prominent face in an image and extracts it, adjusting the crop size based on specified padding parameters.
## Input types
### Required
- **`image`**
    - The input image where a face needs to be detected and cropped. This parameter is crucial as it provides the visual data from which the node will identify and extract the face.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`crop_padding_factor`**
    - Specifies the amount of padding to add around the detected face area before cropping. This helps in ensuring that the face is well-framed within the cropped image, enhancing the visual appeal.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cascade_xml`**
    - An optional parameter specifying the name of the cascade classifier to be used for face detection. This allows for flexibility in choosing different detection algorithms based on the application's requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The cropped image containing the detected face, potentially with added padding for better framing. This output is the primary result of the node's face detection and cropping operation.
    - Python dtype: `PIL.Image.Image`
- **`crop_data`**
    - Comfy dtype: `CROP_DATA`
    - Provides data related to the cropping operation, including the dimensions and location of the cropped area.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [PrepImageForClipVision](../../ComfyUI_IPAdapter_plus/Nodes/PrepImageForClipVision.md)
    - [ImageScale](../../Comfy/Nodes/ImageScale.md)



## Source code
```python
class WAS_Image_Crop_Face:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "crop_padding_factor": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 2.0, "step": 0.01}),
                "cascade_xml": ([
                                "lbpcascade_animeface.xml",
                                "haarcascade_frontalface_default.xml",
                                "haarcascade_frontalface_alt.xml",
                                "haarcascade_frontalface_alt2.xml",
                                "haarcascade_frontalface_alt_tree.xml",
                                "haarcascade_profileface.xml",
                                "haarcascade_upperbody.xml",
                                "haarcascade_eye.xml"
                                ],),
                }
        }

    RETURN_TYPES = ("IMAGE", "CROP_DATA")
    FUNCTION = "image_crop_face"

    CATEGORY = "WAS Suite/Image/Process"

    def image_crop_face(self, image, cascade_xml=None, crop_padding_factor=0.25):
        return self.crop_face(tensor2pil(image), cascade_xml, crop_padding_factor)

    def crop_face(self, image, cascade_name=None, padding=0.25):

        import cv2

        img = np.array(image.convert('RGB'))

        face_location = None

        cascades = [ os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'lbpcascade_animeface.xml'),
                    os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_frontalface_default.xml'),
                    os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_frontalface_alt.xml'),
                    os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_frontalface_alt2.xml'),
                    os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_frontalface_alt_tree.xml'),
                    os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_profileface.xml'),
                    os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_upperbody.xml') ]

        if cascade_name:
            for cascade in cascades:
                if os.path.basename(cascade) == cascade_name:
                    cascades.remove(cascade)
                    cascades.insert(0, cascade)
                    break

        faces = None
        if not face_location:
            for cascade in cascades:
                if not os.path.exists(cascade):
                    cstr(f"Unable to find cascade XML file at `{cascade}`. Did you pull the latest files from https://github.com/WASasquatch/was-node-suite-comfyui repo?").error.print()
                    return (pil2tensor(Image.new("RGB", (512,512), (0,0,0))), False)
                face_cascade = cv2.CascadeClassifier(cascade)
                gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
                if len(faces) != 0:
                    cstr(f"Face found with: {os.path.basename(cascade)}").msg.print()
                    break
            if len(faces) == 0:
                cstr("No faces found in the image!").warning.print()
                return (pil2tensor(Image.new("RGB", (512,512), (0,0,0))), False)
        else:
            cstr("Face found with: face_recognition model").warning.print()
            faces = face_location

        # Assume there is only one face in the image
        x, y, w, h = faces[0]

        # Check if the face region aligns with the edges of the original image
        left_adjust = max(0, -x)
        right_adjust = max(0, x + w - img.shape[1])
        top_adjust = max(0, -y)
        bottom_adjust = max(0, y + h - img.shape[0])

        # Check if the face region is near any edges, and if so, pad in the opposite direction
        if left_adjust < w:
            x += right_adjust
        elif right_adjust < w:
            x -= left_adjust
        if top_adjust < h:
            y += bottom_adjust
        elif bottom_adjust < h:
            y -= top_adjust

        w -= left_adjust + right_adjust
        h -= top_adjust + bottom_adjust

        # Calculate padding around face
        face_size = min(h, w)
        y_pad = int(face_size * padding)
        x_pad = int(face_size * padding)

        # Calculate square coordinates around face
        center_x = x + w // 2
        center_y = y + h // 2
        half_size = (face_size + max(x_pad, y_pad)) // 2
        top = max(0, center_y - half_size)
        bottom = min(img.shape[0], center_y + half_size)
        left = max(0, center_x - half_size)
        right = min(img.shape[1], center_x + half_size)

        # Ensure square crop of the original image
        crop_size = min(right - left, bottom - top)
        left = center_x - crop_size // 2
        right = center_x + crop_size // 2
        top = center_y - crop_size // 2
        bottom = center_y + crop_size // 2

        # Crop face from original image
        face_img = img[top:bottom, left:right, :]

        # Resize image
        size = max(face_img.copy().shape[:2])
        pad_h = (size - face_img.shape[0]) // 2
        pad_w = (size - face_img.shape[1]) // 2
        face_img = cv2.copyMakeBorder(face_img, pad_h, pad_h, pad_w, pad_w, cv2.BORDER_CONSTANT, value=[0,0,0])
        min_size = 64 # Set minimum size for padded image
        if size < min_size:
            size = min_size
        face_img = cv2.resize(face_img, (size, size))

        # Convert numpy array back to PIL image
        face_img = Image.fromarray(face_img)

        # Resize image to a multiple of 64
        original_size = face_img.size
        face_img.resize((((face_img.size[0] // 64) * 64 + 64), ((face_img.size[1] // 64) * 64 + 64)))

        # Return face image and coordinates
        return (pil2tensor(face_img.convert('RGB')), (original_size, (left, top, right, bottom)))

```
