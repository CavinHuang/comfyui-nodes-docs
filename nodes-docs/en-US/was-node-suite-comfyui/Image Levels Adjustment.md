---
tags:
- ImageEnhancement
- ImageTransformation
- VisualEffects
---

# Image Levels Adjustment
## Documentation
- Class name: `Image Levels Adjustment`
- Category: `WAS Suite/Image/Adjustment`
- Output node: `False`

The Image Levels Adjustment node is designed to modify the tonal range of an image by adjusting its black, mid, and white levels. This process enhances the visual quality of the image by altering its contrast and brightness, making it more visually appealing or suitable for further processing.
## Input types
### Required
- **`image`**
    - The input image to be adjusted. This parameter is crucial as it serves as the base for the levels adjustment process, directly influencing the outcome of the adjustment.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`black_level`**
    - Specifies the minimum intensity value that pixels in the image should have. Adjusting this level affects the overall darkness of the image, enhancing details in darker regions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mid_level`**
    - Defines the midpoint intensity value for the image's tonal range. Adjusting the mid level can significantly alter the image's contrast, affecting its overall visual appearance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`white_level`**
    - Sets the maximum intensity value that pixels in the image can reach. This level adjustment brightens the image and can bring out details in lighter areas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The adjusted image with modified black, mid, and white levels. This output reflects the changes made to the image's tonal range, enhancing its visual quality.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CR Image Output](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Output.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [Image To Mask](../../masquerade-nodes-comfyui/Nodes/Image To Mask.md)



## Source code
```python
class WAS_Image_Levels:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "black_level": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 255.0, "step": 0.1}),
                "mid_level": ("FLOAT", {"default": 127.5, "min": 0.0, "max": 255.0, "step": 0.1}),
                "white_level": ("FLOAT", {"default": 255, "min": 0.0, "max": 255.0, "step": 0.1}),
            }
        }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply_image_levels"

    CATEGORY = "WAS Suite/Image/Adjustment"

    def apply_image_levels(self, image, black_level, mid_level, white_level):

        # Convert image to PIL
        tensor_images = []
        for img in image:
            img = tensor2pil(img)
            levels = self.AdjustLevels(black_level, mid_level, white_level)
            tensor_images.append(pil2tensor(levels.adjust(img)))
        tensor_images = torch.cat(tensor_images, dim=0)

        # Return adjust image tensor
        return (tensor_images, )


    class AdjustLevels:
        def __init__(self, min_level, mid_level, max_level):
            self.min_level = min_level
            self.mid_level = mid_level
            self.max_level = max_level

        def adjust(self, im):

            im_arr = np.array(im)
            im_arr[im_arr < self.min_level] = self.min_level
            im_arr = (im_arr - self.min_level) * \
                (255 / (self.max_level - self.min_level))
            im_arr[im_arr < 0] = 0
            im_arr[im_arr > 255] = 255
            im_arr = im_arr.astype(np.uint8)

            im = Image.fromarray(im_arr)
            im = ImageOps.autocontrast(im, cutoff=self.max_level)

            return im

```
