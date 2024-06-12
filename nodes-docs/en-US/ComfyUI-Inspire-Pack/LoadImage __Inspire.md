---
tags:
- Image
---

# Load Image (Inspire)
## Documentation
- Class name: `LoadImage __Inspire`
- Category: `InspirePack/image`
- Output node: `False`

The LoadImage node in the Inspire pack is designed to load and preprocess images for further use in image processing workflows. It handles image loading from a specified directory, applying necessary transformations such as decoding, orientation correction, and normalization, and optionally generating a mask for images with transparency.
## Input types
### Required
- **`image`**
    - Specifies the image file to be loaded. This input is crucial for determining which image is processed and loaded into the workflow.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image_data`**
    - Provides the image data in a base64-encoded string format. This data is decoded and processed to produce the image and its mask if applicable, serving as an alternative input method for image loading.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image, ready for use in subsequent image processing tasks. It is returned as a normalized tensor, reflecting the applied preprocessing steps.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - An optional output providing a mask for the image, useful for images with transparency. It indicates areas of interest or exclusion in further processing steps.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadImageInspire:
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {"required": {
                                "image": (sorted(files) + ["#DATA"], {"image_upload": True}),
                                "image_data": ("STRING", {"multiline": False}),
                            }
                }

    CATEGORY = "InspirePack/image"

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "load_image"

    def load_image(self, image, image_data):
        image_data = base64.b64decode(image_data.split(",")[1])
        i = Image.open(BytesIO(image_data))
        i = ImageOps.exif_transpose(i)
        image = i.convert("RGB")
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        if 'A' in i.getbands():
            mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
            mask = 1. - torch.from_numpy(mask)
        else:
            mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
        return (image, mask.unsqueeze(0))

```
