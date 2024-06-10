---
tags:
- Crop
- Image
- ImageTransformation
---

# Load Image Based on Number (Mikey)
## Documentation
- Class name: `Load Image Based on Number`
- Category: `Mikey/Image`
- Output node: `False`

The node loads an image from a specified directory based on a given index (seed). It is designed to handle large indices by wrapping around the list of image files in the directory, ensuring a valid image is always returned regardless of the seed value.
## Input types
### Required
- **`image_directory`**
    - Specifies the directory from which to load the image. It is crucial for locating and accessing the desired images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - Determines the specific image to load by serving as an index into the sorted list of image files within the directory. The seed ensures a deterministic selection of images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The loaded image, processed and converted into a tensor format suitable for further manipulation or analysis.
    - Python dtype: `torch.Tensor`
- **`filename`**
    - Comfy dtype: `STRING`
    - The name of the file from which the image was loaded, providing a reference to the original image file.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadImgFromDirectoryBasedOnIndex:
    # given a directory of images, and the seed number
    # return the image which is the index of the list of files in the directory
    # use mod to wrap around the list of files because the seed can be a huge number
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image_directory": ("STRING", {"multiline": False, "placeholder": "Image Directory"}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})}}

    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image', 'filename')
    FUNCTION = 'load'
    CATEGORY = 'Mikey/Image'

    def load(self, image_directory, seed):
        if not os.path.exists(image_directory):
            raise Exception(f"Image directory {image_directory} does not exist")

        files = [os.path.join(image_directory, f)
                 for f in os.listdir(image_directory)
                 if os.path.isfile(os.path.join(image_directory, f)) and f.endswith((".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif"))]
        # sort files by name
        files.sort()
        # wrap around the list of files
        offset = seed % len(files)
        filename = files[offset].split('/')[-1]
        img = Image.open(files[offset])
        img = pil2tensor(img)
        return (img, filename)

```
