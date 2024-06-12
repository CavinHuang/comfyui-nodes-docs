---
tags:
- Conditioning
---

# Add CLIP SDXL Refiner Params
## Documentation
- Class name: `BNK_AddCLIPSDXLRParams`
- Category: `conditioning/advanced`
- Output node: `False`

This node is designed to enhance the conditioning data for image generation by incorporating additional parameters such as width, height, and an aesthetic score. It operates by iterating over a list of conditioning elements, modifying each with the specified dimensions and aesthetic score, thereby preparing the data for more tailored and aesthetically pleasing image generation.
## Input types
### Required
- **`conditioning`**
    - The base conditioning data for image generation, which this node modifies by adding width, height, and an aesthetic score to each element.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
- **`width`**
    - Specifies the width to be added to the conditioning data, influencing the dimensions of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height to be added to the conditioning data, influencing the dimensions of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ascore`**
    - An aesthetic score to be added to the conditioning data, aiming to guide the image generation towards more visually appealing results.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The enhanced conditioning data, now including specified width, height, and aesthetic score for each element.
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AddCLIPSDXLRParams:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "conditioning": ("CONDITIONING", ),
            "width": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "height": ("INT", {"default": 1024.0, "min": 0, "max": MAX_RESOLUTION}),
            "ascore": ("FLOAT", {"default": 6.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
            }}
    
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "conditioning/advanced"

    def encode(self, conditioning, width, height, ascore):
        c = []
        for t in conditioning:
            n = [t[0], t[1].copy()]
            n[1]['width'] = width
            n[1]['height'] = height
            n[1]['aesthetic_score'] = ascore
            c.append(n)
        return (c,)

```
