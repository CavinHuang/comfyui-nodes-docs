---
tags:
- Image
- ImageGeneration
---

# Variable Image Builder
## Documentation
- Class name: `Kep_VariableImageBuilder`
- Category: `List Stuff`
- Output node: `False`

The VariableImageBuilder node is designed for generating a batch of images with specified RGBA color values and dimensions. It allows for the creation of uniform color images, which can be used for various purposes such as placeholders, backgrounds, or testing.
## Input types
### Required
- **`r`**
    - Specifies the red component of the RGBA color for the image. It influences the overall color of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`g`**
    - Specifies the green component of the RGBA color for the image. It affects the overall color of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - Specifies the blue component of the RGBA color for the image. It impacts the overall color of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`a`**
    - Specifies the alpha (transparency) component of the RGBA color for the image. It determines the opacity of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Determines the width of the generated images. It defines the horizontal dimension of the images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the generated images. It defines the vertical dimension of the images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Specifies the number of images to generate in a batch. It controls the total output volume of images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`Image`**
    - Comfy dtype: `IMAGE`
    - The output is a batch of images with the specified RGBA color values and dimensions.
    - Python dtype: `Tuple[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class VariableImageBuilder:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "r": ("INT", {"defaultInput": True, "min": 0, "max": 255}),
                "g": ("INT", {"defaultInput": True, "min": 0, "max": 255}),
                "b": ("INT", {"defaultInput": True, "min": 0, "max": 255}),
                "a": ("INT", {"defaultInput": True, "min": 0, "max": 255}),
                "width": ("INT", {"defaultInput": False, "default": 512}),
                "height": ("INT", {"defaultInput": False, "default": 512}),
                "batch_size": ("INT", {"default": 1, "min": 1}),
            },
        }

    RELOAD_INST = True
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("Image",)
    OUTPUT_IS_LIST = (False,)
    FUNCTION = "generate_images"

    CATEGORY = "List Stuff"

    def generate_images(
            self,
            r: int,
            g: int,
            b: int,
            a: int,
            width: int,
            height: int,
            batch_size: int,
    ) -> Tuple[Tensor]:
        batch_tensors: List[Tensor] = []
        for _ in range(batch_size):
            image = Image.new("RGB", (width, height), color=(r, g, b, a))
            batch_tensors.append(pil2tensor(image))
        return (torch.cat(batch_tensors),)

```
