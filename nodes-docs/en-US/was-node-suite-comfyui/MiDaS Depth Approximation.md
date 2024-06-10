---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# MiDaS Depth Approximation
## Documentation
- Class name: `MiDaS Depth Approximation`
- Category: `WAS Suite/Image/AI`
- Output node: `False`

This node utilizes the MiDaS model to approximate depth maps from input images. It supports different MiDaS models and offers options for CPU or GPU execution, depth map inversion, and depth map normalization. The node is designed to enhance image processing tasks by providing detailed depth information, which can be crucial for various applications such as 3D reconstruction, augmented reality, and scene understanding.
## Input types
### Required
- **`image`**
    - The input image tensor for which the depth map will be approximated. This tensor is crucial for generating the depth information that can be used for further image processing or analysis tasks.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`use_cpu`**
    - A flag to determine whether to use the CPU or GPU for processing. This affects the execution speed and efficiency, especially for large images or batches of images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`midas_type`**
    - Specifies the type of MiDaS model to be used for depth approximation. Different models may offer varying levels of detail and accuracy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`invert_depth`**
    - A flag to invert the depth map. This can be useful for certain visualization or processing tasks where the inverse depth representation is preferred.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`midas_model`**
    - Optional parameter to specify a pre-loaded MiDaS model and its associated transform. This allows for flexibility in using custom or pre-trained MiDaS models.
    - Comfy dtype: `MIDAS_MODEL`
    - Python dtype: `Optional[Tuple[torch.nn.Module, Callable]]`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The output depth map tensor, providing a per-pixel depth estimation for the input image. This depth information is valuable for understanding the spatial arrangement of objects in the scene.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



## Source code
```python
class MiDaS_Depth_Approx:
    def __init__(self):
        self.midas_dir = os.path.join(MODELS_DIR, 'midas')

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "use_cpu": (["false", "true"],),
                "midas_type": (["DPT_Large", "DPT_Hybrid"],),
                "invert_depth": (["false", "true"],),
            },
            "optional": {
                "midas_model": ("MIDAS_MODEL",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "midas_approx"

    CATEGORY = "WAS Suite/Image/AI"

    def midas_approx(self, image, use_cpu, midas_type, invert_depth, midas_model=None):

        global MIDAS_INSTALLED

        if not MIDAS_INSTALLED:
            self.install_midas()

        import cv2 as cv

        if midas_model:

            midas = midas_model[0]
            transform = midas_model[1]
            device = torch.device("cuda") if torch.cuda.is_available() and use_cpu == 'false' else torch.device("cpu")
            cstr(f"MiDaS is using device: {device}").msg.print()
            midas.to(device).eval()

        else:

            if midas_model == 'DPT_Large':
                model_name = 'dpt_large_384.pt'
            elif midas_model == 'DPT_Hybrid':
                model_name = 'dpt_hybrid_384.pt'
            else:
                model_name = 'dpt_large_384.pt'

            model_path = os.path.join(self.midas_dir, 'checkpoints'+os.sep+model_name)

            torch.hub.set_dir(self.midas_dir)
            if os.path.exists(model_path):
                cstr(f"Loading MiDaS Model from `{model_path}`").msg.print()
                midas_type = model_path
            else:
                cstr("Downloading and loading MiDaS Model...").msg.print()
            midas = torch.hub.load("intel-isl/MiDaS", midas_type, trust_repo=True)

            cstr(f"MiDaS is using device: {device}").msg.print()

            midas.to(device).eval()
            midas_transforms = torch.hub.load("intel-isl/MiDaS", "transforms")

            transform = midas_transforms.dpt_transform

        tensor_images = []
        for i, img in enumerate(image):

            img = np.array(tensor2pil(img))

            img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
            input_batch = transform(img).to(device)

            cstr(f"Approximating depth for image {i+1}/{len(image)}").msg.print()

            with torch.no_grad():
                prediction = midas(input_batch)
                prediction = torch.nn.functional.interpolate(
                    prediction.unsqueeze(1),
                    size=img.shape[:2],
                    mode="bicubic",
                    align_corners=False,
                ).squeeze()


            # Normalize and convert to uint8
            min_val = torch.min(prediction)
            max_val = torch.max(prediction)
            prediction = (prediction - min_val) / (max_val - min_val)
            prediction = (prediction * 255).clamp(0, 255).round().cpu().numpy().astype(np.uint8)

            depth = Image.fromarray(prediction)

            # Invert depth map
            if invert_depth == 'true':
                depth = ImageOps.invert(depth)

            tensor_images.append(pil2tensor(depth.convert("RGB")))

        tensor_images = torch.cat(tensor_images, dim=0)
        if not midas_model:
            del midas, device, midas_transforms
        del midas, transform, img, input_batch, prediction

        return (tensor_images, )

    def install_midas(self):
        global MIDAS_INSTALLED
        if 'timm' not in packages():
            install_package("timm")
        MIDAS_INSTALLED = True

```
