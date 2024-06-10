---
tags:
- Crop
- Image
- ImageTransformation
---

# Batch Load Images (Mikey)
## Documentation
- Class name: `Batch Load Images`
- Category: `Mikey/Image`
- Output node: `False`

This node is designed to load a batch of images from a specified directory, optionally including images from subdirectories. It supports various image formats and converts them into a tensor format suitable for further processing or model input.
## Input types
### Required
- **`image_directory`**
    - Specifies the directory path where images are stored. This path is essential for locating and loading the images into the node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`subdirectories`**
    - Determines whether to include images from subdirectories within the specified image directory. This allows for more comprehensive image loading.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs a list of images loaded and converted into tensor format, ready for further processing or as input to models.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchLoadImages:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image_directory": ("STRING", {"multiline": False, "placeholder": "Image Directory"}),
                             "subdirectories": (['true', 'false'], {"default": 'false'})}}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'batch'
    CATEGORY = 'Mikey/Image'
    OUTPUT_IS_LIST = (True, )

    def batch(self, image_directory, subdirectories):
        if not os.path.exists(image_directory):
            raise Exception(f"Image directory {image_directory} does not exist")

        images = []
        for file in os.listdir(image_directory):
            if file.endswith('.png') or file.endswith('.jpg') or file.endswith('.jpeg') or file.endswith('.webp') or file.endswith('.bmp') or file.endswith('.gif'):
                img = Image.open(os.path.join(image_directory, file))
                img = pil2tensor(img)
                images.append(img)
        #print(f'Loaded {len(images)} images')
        return (images,)

```
