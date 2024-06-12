---
tags:
- Crop
- Image
- ImageTransformation
---

# Batch Crop Image (Mikey)
## Documentation
- Class name: `Batch Crop Image`
- Category: `Mikey/Image`
- Output node: `False`

The BatchCropImage node is designed for processing a batch of images by cropping them based on a specified amount. It operates on a directory of images, applying a uniform crop operation to each image to reduce their dimensions by a certain percentage, thereby preparing the images for further processing or analysis.
## Input types
### Required
- **`image_directory`**
    - Specifies the directory containing the images to be processed. It is crucial for locating and accessing the batch of images for cropping.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`crop_amount`**
    - Determines the percentage of the image to be cropped from each side. This parameter directly influences the final size of the cropped images, affecting both their width and height.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The cropped images are returned as a list, with each element representing a cropped version of the original images found in the specified directory.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchCropImage:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image_directory": ("STRING", {"multiline": False, "placeholder": "Image Directory"}),
                             "crop_amount": ("FLOAT", {"default": 0.05})}}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'batch'
    CATEGORY = 'Mikey/Image'
    OUTPUT_IS_LIST = (True, )

    def batch(self, image_directory, crop_amount):
        if not os.path.exists(image_directory):
            raise Exception(f"Image directory {image_directory} does not exist")

        images = []
        for file in os.listdir(image_directory):
            if file.endswith('.png') or file.endswith('.jpg') or file.endswith('.jpeg') or file.endswith('.webp') or file.endswith('.bmp') or file.endswith('.gif'):
                img = Image.open(os.path.join(image_directory, file))
                # resize image
                width, height = img.size
                pixels = int(width * crop_amount) // 8 * 8
                left = pixels
                upper = pixels
                right = width - pixels
                lower = height - pixels
                # Crop the image
                cropped_img = img.crop((left, upper, right, lower))
                img = pil2tensor(cropped_img)
                images.append(img)
        return (images,)

```
