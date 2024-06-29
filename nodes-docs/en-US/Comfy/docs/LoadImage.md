---
tags:
- Image
- ImageLoad
---

# Load Image
## Documentation
- Class name: `LoadImage`
- Category: `image`
- Output node: `False`

The LoadImage node is designed to load and preprocess images from a specified path. It handles image formats with multiple frames, applies necessary transformations such as rotation based on EXIF data, normalizes pixel values, and optionally generates a mask for images with an alpha channel. This node is essential for preparing images for further processing or analysis within a pipeline.
## Input types
### Required
- **`image`**
    - The 'image' parameter specifies the identifier of the image to be loaded and processed. It is crucial for determining the path to the image file and subsequently loading the image for transformation and normalization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image, with pixel values normalized and transformations applied as necessary. It is ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - An optional output providing a mask for the image, useful in scenarios where the image includes an alpha channel for transparency.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - [ReActorFaceSwap](../../comfyui-reactor-node/Nodes/ReActorFaceSwap.md)
    - IPAdapterApply
    - Reroute
    - [VAEEncodeForInpaint](../../Comfy/Nodes/VAEEncodeForInpaint.md)
    - [PrepImageForClipVision](../../ComfyUI_IPAdapter_plus/Nodes/PrepImageForClipVision.md)
    - [MiDaS-DepthMapPreprocessor](../../comfyui_controlnet_aux/Nodes/MiDaS-DepthMapPreprocessor.md)
    - [OpenposePreprocessor](../../comfyui_controlnet_aux/Nodes/OpenposePreprocessor.md)
    - [InpaintPreprocessor](../../comfyui_controlnet_aux/Nodes/InpaintPreprocessor.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)



## Source code
```python
class LoadImage:
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {"required":
                    {"image": (sorted(files), {"image_upload": True})},
                }

    CATEGORY = "image"

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "load_image"
    def load_image(self, image):
        image_path = folder_paths.get_annotated_filepath(image)
        img = Image.open(image_path)
        output_images = []
        output_masks = []
        for i in ImageSequence.Iterator(img):
            i = ImageOps.exif_transpose(i)
            if i.mode == 'I':
                i = i.point(lambda i: i * (1 / 255))
            image = i.convert("RGB")
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            if 'A' in i.getbands():
                mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                mask = 1. - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64,64), dtype=torch.float32, device="cpu")
            output_images.append(image)
            output_masks.append(mask.unsqueeze(0))

        if len(output_images) > 1:
            output_image = torch.cat(output_images, dim=0)
            output_mask = torch.cat(output_masks, dim=0)
        else:
            output_image = output_images[0]
            output_mask = output_masks[0]

        return (output_image, output_mask)

    @classmethod
    def IS_CHANGED(s, image):
        image_path = folder_paths.get_annotated_filepath(image)
        m = hashlib.sha256()
        with open(image_path, 'rb') as f:
            m.update(f.read())
        return m.digest().hex()

    @classmethod
    def VALIDATE_INPUTS(s, image):
        if not folder_paths.exists_annotated_filepath(image):
            return "Invalid image file: {}".format(image)

        return True

```
