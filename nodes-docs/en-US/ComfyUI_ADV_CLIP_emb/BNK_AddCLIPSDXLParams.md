---
tags:
- Conditioning
---

# Add CLIP SDXL Params
## Documentation
- Class name: `BNK_AddCLIPSDXLParams`
- Category: `conditioning/advanced`
- Output node: `False`

This node is designed to augment the conditioning data with additional parameters related to image dimensions and cropping. It enriches the conditioning context by specifying width, height, crop width, crop height, target width, and target height, facilitating more precise control over the image generation process.
## Input types
### Required
- **`conditioning`**
    - The conditioning data to be augmented with image dimension and cropping parameters. It plays a crucial role in defining the context for image generation.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
- **`width`**
    - Specifies the width of the image. It affects the conditioning by setting a specific dimension for image generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the image, contributing to the conditioning by defining a specific dimension for image generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_w`**
    - Determines the width of the crop area, allowing for more focused image generation based on the specified region.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_h`**
    - Determines the height of the crop area, enabling more targeted image generation based on the specified region.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_width`**
    - Sets the target width for the image generation, influencing the final dimensions of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_height`**
    - Sets the target height for the image generation, impacting the final dimensions of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The augmented conditioning data, now including specific image dimensions and cropping parameters, ready for use in further processing.
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AddCLIPSDXLParams:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "conditioning": ("CONDITIONING", ),
            "width": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "height": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "crop_w": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION}),
            "crop_h": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION}),
            "target_width": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "target_height": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            }}
    
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "conditioning/advanced"

    def encode(self, conditioning, width, height, crop_w, crop_h, target_width, target_height):
        c = []
        for t in conditioning:
            n = [t[0], t[1].copy()]
            n[1]['width'] = width
            n[1]['height'] = height
            n[1]['crop_w'] = crop_w
            n[1]['crop_h'] = crop_h
            n[1]['target_width'] = target_width
            n[1]['target_height'] = target_height
            c.append(n)
        return (c,)

```
