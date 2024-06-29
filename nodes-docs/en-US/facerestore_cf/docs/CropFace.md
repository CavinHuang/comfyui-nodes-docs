---
tags:
- Crop
- Image
- ImageTransformation
---

# CropFace
## Documentation
- Class name: `CropFace`
- Category: `facerestore_cf`
- Output node: `False`

The CropFace node is designed for processing images by detecting faces, cropping them, and then applying a face restoration model to enhance or restore the cropped face images. It utilizes face detection to identify faces within an image, crops these faces, and then processes each cropped face through a face restoration model to improve image quality or restore facial details.
## Input types
### Required
- **`image`**
    - The input image to be processed for face detection and restoration.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`facedetection`**
    - The face detection model used to identify and locate faces within the input image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `torch.nn.Module`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a tensor of the cropped and restored faces, ready for further processing or visualization.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



## Source code
```python
class CropFace:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image": ("IMAGE",),
                              "facedetection": (["retinaface_resnet50", "retinaface_mobile0.25", "YOLOv5l", "YOLOv5n"],)
                              }}

    RETURN_TYPES = ("IMAGE",)

    FUNCTION = "crop_face"

    CATEGORY = "facerestore_cf"

    def __init__(self):
        self.face_helper = None

    def crop_face(self, image, facedetection):
        device = model_management.get_torch_device()
        if self.face_helper is None:
            self.face_helper = FaceRestoreHelper(1, face_size=512, crop_ratio=(1, 1), det_model=facedetection, save_ext='png', use_parse=True, device=device)

        image_np = 255. * image.cpu().numpy()

        total_images = image_np.shape[0]
        out_images = np.ndarray(shape=(total_images, 512, 512, 3))
        next_idx = 0

        for i in range(total_images):

            cur_image_np = image_np[i,:, :, ::-1]

            original_resolution = cur_image_np.shape[0:2]

            if self.face_helper is None:
                return image

            self.face_helper.clean_all()
            self.face_helper.read_image(cur_image_np)
            self.face_helper.get_face_landmarks_5(only_center_face=False, resize=640, eye_dist_threshold=5)
            self.face_helper.align_warp_face()

            faces_found = len(self.face_helper.cropped_faces)
            if faces_found == 0:
                next_idx += 1 # output black image for no face
            if out_images.shape[0] < next_idx + faces_found:
                print(out_images.shape)
                print((next_idx + faces_found, 512, 512, 3))
                print('aaaaa')
                out_images = np.resize(out_images, (next_idx + faces_found, 512, 512, 3))
                print(out_images.shape)
            for j in range(faces_found):
                cropped_face_1 = self.face_helper.cropped_faces[j]
                cropped_face_2 = img2tensor(cropped_face_1 / 255., bgr2rgb=True, float32=True)
                normalize(cropped_face_2, (0.5, 0.5, 0.5), (0.5, 0.5, 0.5), inplace=True)
                cropped_face_3 = cropped_face_2.unsqueeze(0).to(device)
                cropped_face_4 = tensor2img(cropped_face_3, rgb2bgr=True, min_max=(-1, 1)).astype('uint8')
                cropped_face_5 = cv2.cvtColor(cropped_face_4, cv2.COLOR_BGR2RGB)
                out_images[next_idx] = cropped_face_5
                next_idx += 1

        cropped_face_6 = np.array(out_images).astype(np.float32) / 255.0
        cropped_face_7 = torch.from_numpy(cropped_face_6)
        return (cropped_face_7,)

```
