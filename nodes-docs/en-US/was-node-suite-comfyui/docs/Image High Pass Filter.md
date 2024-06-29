---
tags:
- ImageFilter
- VisualEffects
---

# Image High Pass Filter
## Documentation
- Class name: `Image High Pass Filter`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

This node applies a high-pass filter to an image, enhancing edges and details by subtracting a blurred version of the image from the original. It supports adjustments for the filter's radius and strength, and offers options for color output and a neutral background.
## Input types
### Required
- **`images`**
    - The input images to be processed with the high-pass filter. The filter enhances edges and details by emphasizing high-frequency components.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`radius`**
    - Determines the radius of the Gaussian blur applied to create the high-pass filter, affecting the level of detail enhancement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`strength`**
    - Adjusts the intensity of the high-pass filter effect, controlling how much the edges and details are emphasized.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`color_output`**
    - Specifies whether the output image should be in color or grayscale.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`neutral_background`**
    - Determines if a neutral background should be applied to the image, potentially enhancing visibility of details.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The resulting images after applying the high-pass filter, with enhanced edges and details.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_High_Pass_Filter:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "radius": ("INT", {"default": 10, "min": 1, "max": 500, "step": 1}),
                "strength": ("FLOAT", {"default": 1.5, "min": 0.0, "max": 255.0, "step": 0.1}),
                "color_output": (["true", "false"],),
                "neutral_background": (["true", "false"],),
            }
        }
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "high_pass"

    CATEGORY = "WAS Suite/Image/Filter"

    def high_pass(self, images, radius=10, strength=1.5, color_output="true", neutral_background="true"):
        batch_tensor = []
        for image in images:
            transformed_image = self.apply_hpf(tensor2pil(image), radius, strength, color_output, neutral_background)
            batch_tensor.append(pil2tensor(transformed_image))
        batch_tensor = torch.cat(batch_tensor, dim=0)
        return (batch_tensor, )

    def apply_hpf(self, img, radius=10, strength=1.5, color_output="true", neutral_background="true"):
        img_arr = np.array(img).astype('float')
        blurred_arr = np.array(img.filter(ImageFilter.GaussianBlur(radius=radius))).astype('float')
        hpf_arr = img_arr - blurred_arr
        hpf_arr = np.clip(hpf_arr * strength, 0, 255).astype('uint8')

        if color_output == "true":
            high_pass = Image.fromarray(hpf_arr, mode='RGB')
        else:
            grayscale_arr = np.mean(hpf_arr, axis=2).astype('uint8')
            high_pass = Image.fromarray(grayscale_arr, mode='L')

        if neutral_background == "true":
            neutral_color = (128, 128, 128) if high_pass.mode == 'RGB' else 128
            neutral_bg = Image.new(high_pass.mode, high_pass.size, neutral_color)
            high_pass = ImageChops.screen(neutral_bg, high_pass)

        return high_pass.convert("RGB")

```
