---
tags:
- Face
- FaceRestoration
---

# FaceRestoreCFWithModel
## Documentation
- Class name: `FaceRestoreCFWithModel`
- Category: `facerestore_cf`
- Output node: `False`

This node is designed to restore faces in images using a face restoration model. It leverages advanced deep learning techniques to enhance the quality of faces in images, addressing issues such as blurriness, noise, and artifacts. The node operates by detecting faces, processing each face individually with the restoration model, and then integrating the enhanced faces back into the original image.
## Input types
### Required
- **`facerestore_model`**
    - The face restoration model used for enhancing the quality of faces in images. It plays a crucial role in the node's ability to improve image clarity and detail.
    - Comfy dtype: `FACERESTORE_MODEL`
    - Python dtype: `torch.nn.Module`
- **`image`**
    - The input image containing faces to be restored. This image is processed to detect and enhance faces individually.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`facedetection`**
    - The face detection model used to identify faces within the input image. It ensures that each face is accurately detected before restoration.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`codeformer_fidelity`**
    - A parameter controlling the fidelity of the restoration process. It adjusts the balance between enhancing details and preserving the original appearance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with faces restored. It showcases the enhanced clarity and detail of faces after processing.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [CR Apply Multi Upscale](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply Multi Upscale.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)



## Source code
```python
class FaceRestoreCFWithModel:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "facerestore_model": ("FACERESTORE_MODEL",),
                              "image": ("IMAGE",),
                              "facedetection": (["retinaface_resnet50", "retinaface_mobile0.25", "YOLOv5l", "YOLOv5n"],),
                              "codeformer_fidelity": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1, "step": 0.05})
                              }}

    RETURN_TYPES = ("IMAGE",)

    FUNCTION = "restore_face"

    CATEGORY = "facerestore_cf"

    def __init__(self):
        self.face_helper = None

    def restore_face(self, facerestore_model, image, facedetection, codeformer_fidelity):
        print(f'\tStarting restore_face with codeformer_fidelity: {codeformer_fidelity}')
        device = model_management.get_torch_device()
        facerestore_model.to(device)
        if self.face_helper is None:
            self.face_helper = FaceRestoreHelper(1, face_size=512, crop_ratio=(1, 1), det_model=facedetection, save_ext='png', use_parse=True, device=device)

        image_np = 255. * image.cpu().numpy()

        total_images = image_np.shape[0]
        out_images = np.ndarray(shape=image_np.shape)

        for i in range(total_images):
            cur_image_np = image_np[i,:, :, ::-1]

            original_resolution = cur_image_np.shape[0:2]

            if facerestore_model is None or self.face_helper is None:
                return image

            self.face_helper.clean_all()
            self.face_helper.read_image(cur_image_np)
            self.face_helper.get_face_landmarks_5(only_center_face=False, resize=640, eye_dist_threshold=5)
            self.face_helper.align_warp_face()

            restored_face = None
            for idx, cropped_face in enumerate(self.face_helper.cropped_faces):
                cropped_face_t = img2tensor(cropped_face / 255., bgr2rgb=True, float32=True)
                normalize(cropped_face_t, (0.5, 0.5, 0.5), (0.5, 0.5, 0.5), inplace=True)
                cropped_face_t = cropped_face_t.unsqueeze(0).to(device)

                try:
                    with torch.no_grad():
                        #output = facerestore_model(cropped_face_t, w=strength, adain=True)[0]
                        # output = facerestore_model(cropped_face_t)[0]
                        output = facerestore_model(cropped_face_t, w=codeformer_fidelity)[0]
                        restored_face = tensor2img(output, rgb2bgr=True, min_max=(-1, 1))
                    del output
                    torch.cuda.empty_cache()
                except Exception as error:
                    print(f'\tFailed inference for CodeFormer: {error}', file=sys.stderr)
                    restored_face = tensor2img(cropped_face_t, rgb2bgr=True, min_max=(-1, 1))

                restored_face = restored_face.astype('uint8')
                self.face_helper.add_restored_face(restored_face)

            self.face_helper.get_inverse_affine(None)

            restored_img = self.face_helper.paste_faces_to_input_image()
            restored_img = restored_img[:, :, ::-1]

            if original_resolution != restored_img.shape[0:2]:
                restored_img = cv2.resize(restored_img, (0, 0), fx=original_resolution[1]/restored_img.shape[1], fy=original_resolution[0]/restored_img.shape[0], interpolation=cv2.INTER_LINEAR)

            self.face_helper.clean_all()

            # restored_img = cv2.cvtColor(restored_face, cv2.COLOR_BGR2RGB)

            out_images[i] = restored_img

        restored_img_np = np.array(out_images).astype(np.float32) / 255.0
        restored_img_tensor = torch.from_numpy(restored_img_np)
        return (restored_img_tensor,)

```
