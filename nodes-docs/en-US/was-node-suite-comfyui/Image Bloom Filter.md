---
tags:
- ImageFilter
- VisualEffects
---

# Image Bloom Filter
## Documentation
- Class name: `Image Bloom Filter`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

The node applies a bloom filter effect to an image, enhancing its visual appeal by simulating the way the human eye perceives extreme brightness. It blurs the bright areas and adds them back to the original image, creating a glowing effect around bright spots.
## Input types
### Required
- **`image`**
    - The image to which the bloom filter effect will be applied. It serves as the base for creating the bloom effect by undergoing a series of transformations including blurring and brightness adjustment.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`radius`**
    - Defines the radius for the Gaussian blur applied during the bloom filter effect creation. It influences the spread and intensity of the bloom effect around bright areas of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`intensity`**
    - A multiplier for the bloom effect's intensity. It controls how much the bloom effect contributes to the final image, allowing for fine-tuning of the glow's strength around bright spots.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final image after applying the bloom filter effect, showcasing enhanced brightness and a glowing effect around bright areas.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Bloom_Filter:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "radius": ("FLOAT", {"default": 10, "min": 0.0, "max": 1024, "step": 0.1}),
                "intensity": ("FLOAT", {"default": 1, "min": 0.0, "max": 1.0, "step": 0.1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_bloom"

    CATEGORY = "WAS Suite/Image/Filter"

    def image_bloom(self, image, radius=0.5, intensity=1.0):
        return (pil2tensor(self.apply_bloom_filter(tensor2pil(image), radius, intensity)), )

    def apply_bloom_filter(self, input_image, radius, bloom_factor):
        # Apply a blur filter to the input image
        blurred_image = input_image.filter(
            ImageFilter.GaussianBlur(radius=radius))

        # Subtract the blurred image from the input image to create a high-pass filter
        high_pass_filter = ImageChops.subtract(input_image, blurred_image)

        # Create a blurred version of the bloom filter
        bloom_filter = high_pass_filter.filter(
            ImageFilter.GaussianBlur(radius=radius*2))

        # Adjust brightness and levels of bloom filter
        bloom_filter = ImageEnhance.Brightness(bloom_filter).enhance(2.0)

        # Multiply the bloom image with the bloom factor
        bloom_filter = ImageChops.multiply(bloom_filter, Image.new('RGB', input_image.size, (int(
            255 * bloom_factor), int(255 * bloom_factor), int(255 * bloom_factor))))

        # Multiply the bloom filter with the original image using the bloom factor
        blended_image = ImageChops.screen(input_image, bloom_filter)

        return blended_image

```
