---
tags:
- Crop
- Image
- ImageTransformation
---

# Crop Batch Image Location
## Documentation
- Class name: `SaltCropImageLocation`
- Category: `SALT/Image/Process`
- Output node: `False`

This node is designed to crop images based on specified locations, allowing for precise adjustments and modifications to image datasets. It focuses on enhancing or isolating specific areas within images for further processing or analysis.
## Input types
### Required
- **`images`**
    - The collection of images to be cropped. This parameter is central to the node's operation, as it determines the specific images that will undergo cropping based on the provided dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`top`**
    - Specifies the top boundary of the crop area. Adjusting this value alters the vertical starting point of the crop, enabling fine-tuned control over the cropped region.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`left`**
    - Defines the left boundary of the crop area. This parameter allows for precise horizontal positioning of the crop, affecting the area of the image that is retained.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right`**
    - Sets the right boundary of the crop area, determining the horizontal extent of the cropped region. This value influences the width of the resulting cropped image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom`**
    - Indicates the bottom boundary of the crop area. This parameter affects the vertical extent of the crop, controlling the height of the cropped image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`crop_data_batch`**
    - An optional batch of crop data that can be used to specify multiple crop regions for a set of images. This parameter enables batch processing of images with varying crop specifications.
    - Comfy dtype: `CROP_DATA_BATCH`
    - Python dtype: `Optional[List[Tuple[int, int, int, int]]]`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The resulting images after the cropping operation. This output is essential for further processing or analysis of the cropped areas.
    - Python dtype: `List[Image]`
- **`crop_data_batch`**
    - Comfy dtype: `CROP_DATA_BATCH`
    - A batch of crop data corresponding to the processed images. This output provides detailed information about the crop regions applied to each image, facilitating further manipulations or analyses.
    - Python dtype: `List[Tuple[int, int, int, int]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltCropImageLocation:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "top": ("INT", {"default":0, "max": 10000000, "min":0, "step":1}),
                "left": ("INT", {"default":0, "max": 10000000, "min":0, "step":1}),
                "right": ("INT", {"default":256, "max": 10000000, "min":0, "step":1}),
                "bottom": ("INT", {"default":256, "max": 10000000, "min":0, "step":1}),
            },
            "optional": {
                "crop_data_batch": ("CROP_DATA_BATCH",)
            }
        }
    
    RETURN_TYPES = ("IMAGE", "CROP_DATA_BATCH")
    RETURN_NAMES = ("images", "crop_data_batch")

    FUNCTION = "crop"
    CATEGORY = f"{NAME}/Image/Process"

    def crop(self, images, top=0, left=0, right=256, bottom=256, crop_data_batch=None):
        cropped_images = []
        crop_data_list = []
        master_size = None
        
        for i, image in enumerate(images):
            image = tensor2pil(image)
            img_width, img_height = image.size

            if crop_data_batch is not None:
                if len(crop_data_batch) >= i:
                    crop_size, (crop_left, crop_top, crop_right, crop_bottom) = crop_data_batch[i]
                else:
                    cropped_images.append(pil2tensor(image))
                    crop_data_list.append((image.size, (0, 0, image.size[0], image.size[1])))
                    continue
            else:
                crop_top = max(top, 0)
                crop_left = max(left, 0)
                crop_bottom = min(bottom, img_height)
                crop_right = min(right, img_width)

            crop_width = crop_right - crop_left
            crop_height = crop_bottom - crop_top

            if crop_width <= 0 or crop_height <= 0:
                raise ValueError("Invalid crop dimensions.")
            
            crop = image.crop((crop_left, crop_top, crop_right, crop_bottom))
            crop_data = (crop.size, (crop_left, crop_top, crop_right, crop_bottom))
            if not master_size:
                master_size = (((crop.size[0] // 8) * 8), ((crop.size[1] // 8) * 8))
            crop = crop.resize(master_size)
            
            cropped_images.append(pil2tensor(crop))
            crop_data_list.append(crop_data)
        
        cropped_images_batch = torch.cat(cropped_images, dim=0)
        return (cropped_images_batch, crop_data_list)

```
