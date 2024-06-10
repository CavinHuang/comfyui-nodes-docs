---
tags:
- Image
- ImageLoad
---

# Image Load
## Documentation
- Class name: `Image Load`
- Category: `WAS Suite/IO`
- Output node: `False`

The Image Load node is designed to load images from a specified path, supporting both local and remote sources. It processes the images to convert them into a format suitable for further analysis or manipulation, optionally handling RGBA conversion and providing filename information. This node is essential for preparing image data for downstream tasks in image processing pipelines.
## Input types
### Required
- **`image_path`**
    - Specifies the path to the image to be loaded. This can be a local file path or a URL to an image online. The node handles different sources and formats, ensuring the image is accessible for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`RGBA`**
    - Determines whether the loaded image should be converted to RGBA format. This is useful for maintaining transparency information in images that support it.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
### Optional
- **`filename_text_extension`**
    - Controls whether the returned filename includes the file extension. This can be useful for subsequent processing steps that may require the filename with or without its extension.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image data, converted to a tensor format suitable for further analysis or manipulation.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - A mask tensor representing the alpha channel of the image, useful for operations that require knowledge of transparent areas.
    - Python dtype: `torch.Tensor`
- **`filename_text`**
    - Comfy dtype: `STRING`
    - The filename of the loaded image, optionally including the file extension based on the input parameter.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Load_Image:

    def __init__(self):
        self.input_dir = comfy_paths.input_directory
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)

    @classmethod
    def INPUT_TYPES(cls):
        return {
                "required": {
                    "image_path": ("STRING", {"default": './ComfyUI/input/example.png', "multiline": False}),
                    "RGBA": (["false","true"],),
                },
                "optional": {
                    "filename_text_extension": (["true", "false"],),
                }
            }

    RETURN_TYPES = ("IMAGE", "MASK", TEXT_TYPE)
    RETURN_NAMES = ("image", "mask", "filename_text")
    FUNCTION = "load_image"

    CATEGORY = "WAS Suite/IO"

    def load_image(self, image_path, RGBA='false', filename_text_extension="true"):

        RGBA = (RGBA == 'true')

        if image_path.startswith('http'):
            from io import BytesIO
            i = self.download_image(image_path)
        else:
            try:
                i = Image.open(image_path)
            except OSError:
                cstr(f"The image `{image_path.strip()}` specified doesn't exist!").error.print()
                i = Image.new(mode='RGB', size=(512, 512), color=(0, 0, 0))
        if not i:
            return

        # Update history
        update_history_images(image_path)

        image = i
        if not RGBA:
            image = image.convert('RGB')
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]

        if 'A' in i.getbands():
            mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
            mask = 1. - torch.from_numpy(mask)
        else:
            mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")

        if filename_text_extension == "true":
            filename = os.path.basename(image_path)
        else:
            filename = os.path.splitext(os.path.basename(image_path))[0]

        return (image, mask, filename)

    def download_image(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()
            img = Image.open(BytesIO(response.content))
            return img
        except requests.exceptions.HTTPError as errh:
            cstr(f"HTTP Error: ({url}): {errh}").error.print()
        except requests.exceptions.ConnectionError as errc:
            cstr(f"Connection Error: ({url}): {errc}").error.print()
        except requests.exceptions.Timeout as errt:
            cstr(f"Timeout Error: ({url}): {errt}").error.print()
        except requests.exceptions.RequestException as err:
            cstr(f"Request Exception: ({url}): {err}").error.print()

    @classmethod
    def IS_CHANGED(cls, image_path):
        if image_path.startswith('http'):
            return float("NaN")
        m = hashlib.sha256()
        with open(image_path, 'rb') as f:
            m.update(f.read())
        return m.digest().hex()

```
