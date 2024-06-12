---
tags:
- Image
- ImageLoad
---

# Load Image (as Mask)
## Documentation
- Class name: `LoadImageMask`
- Category: `mask`
- Output node: `False`

The LoadImageMask node is designed to load images and their associated masks from a specified path, processing them to ensure compatibility with further image manipulation or analysis tasks. It focuses on handling various image formats and conditions, such as presence of an alpha channel for masks, and prepares the images and masks for downstream processing by converting them to a standardized format.
## Input types
### Required
- **`image`**
    - The 'image' parameter specifies the image file to be loaded and processed. It plays a crucial role in determining the output by providing the source image for mask extraction and format conversion.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`channel`**
    - The 'channel' parameter specifies the color channel of the image that will be used to generate the mask. This allows for flexibility in mask creation based on different color channels, enhancing the node's utility in various image processing scenarios.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - This node outputs the mask generated from the specified image and channel, prepared in a standardized format suitable for further processing in image manipulation tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadImageMask:
    _color_channels = ["alpha", "red", "green", "blue"]
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {"required":
                    {"image": (sorted(files), {"image_upload": True}),
                     "channel": (s._color_channels, ), }
                }

    CATEGORY = "mask"

    RETURN_TYPES = ("MASK",)
    FUNCTION = "load_image"
    def load_image(self, image, channel):
        image_path = folder_paths.get_annotated_filepath(image)
        i = Image.open(image_path)
        i = ImageOps.exif_transpose(i)
        if i.getbands() != ("R", "G", "B", "A"):
            if i.mode == 'I':
                i = i.point(lambda i: i * (1 / 255))
            i = i.convert("RGBA")
        mask = None
        c = channel[0].upper()
        if c in i.getbands():
            mask = np.array(i.getchannel(c)).astype(np.float32) / 255.0
            mask = torch.from_numpy(mask)
            if c == 'A':
                mask = 1. - mask
        else:
            mask = torch.zeros((64,64), dtype=torch.float32, device="cpu")
        return (mask.unsqueeze(0),)

    @classmethod
    def IS_CHANGED(s, image, channel):
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
