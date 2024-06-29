# Width/Height Literal
## Documentation
- Class name: `Width_Height Literal`
- Category: `ImageSaverTools/utils`
- Output node: `False`

The Width/Height Literal node is designed to provide a straightforward way to specify and pass fixed width and height values as parameters within a node-based processing pipeline. This node simplifies the configuration of dimensions for various operations, ensuring that downstream nodes receive consistent and accurate size specifications.
## Input types
### Required
- **`int`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Image Generate Gradient](../../was-node-suite-comfyui/Nodes/Image Generate Gradient.md)
    - Generate Noise Image
    - [Image Perlin Noise](../../was-node-suite-comfyui/Nodes/Image Perlin Noise.md)



## Source code
```python
class SizeLiteral:
    RETURN_TYPES = ("INT",)
    FUNCTION = "get_int"
    CATEGORY = "ImageSaverTools/utils"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"int": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 8})}}

    def get_int(self, int):
        return (int,)

```
