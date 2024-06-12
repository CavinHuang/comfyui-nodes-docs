---
tags:
- Latent
---

# EmptyLatentImagePresets
## Documentation
- Class name: `EmptyLatentImagePresets`
- Category: `KJNodes`
- Output node: `False`

The `EmptyLatentImagePresets` node provides a high-level interface for generating latent images with predefined dimension presets. It simplifies the process of creating empty latent images by allowing users to select from a set of common resolutions, optionally invert the dimensions, and specify a batch size for generation. This node abstracts the complexity of latent image generation, making it accessible for various applications requiring initial latent spaces.
## Input types
### Required
- **`dimensions`**
    - Specifies the dimensions of the latent image to be generated from a predefined list of common resolutions. This selection determines the width and height of the output latent image, streamlining the setup process for generating latent spaces.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`invert`**
    - A boolean flag that, when set to True, inverts the selected dimensions, swapping the width and height. This allows for flexible adaptation of the latent image's aspect ratio according to specific needs.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`batch_size`**
    - Determines the number of latent images to generate in a single batch. This parameter enables efficient bulk generation of latent spaces, catering to applications requiring multiple instances at once.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`Latent`**
    - Comfy dtype: `LATENT`
    - The generated latent image or images, represented as a tensor. This output is the primary result of the node, providing the initial latent space for further processing or generation tasks.
    - Python dtype: `torch.Tensor`
- **`Width`**
    - Comfy dtype: `INT`
    - The width of the generated latent image(s), derived from the selected dimensions or their inversion. This output provides dimensional information about the latent space.
    - Python dtype: `int`
- **`Height`**
    - Comfy dtype: `INT`
    - The height of the generated latent image(s), derived from the selected dimensions or their inversion. This output provides dimensional information about the latent space.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)



## Source code
```python
class EmptyLatentImagePresets:
    @classmethod
    def INPUT_TYPES(cls):  
        return {
        "required": {
            "dimensions": (
            [   '512 x 512',
                '768 x 512',
                '960 x 512',
                '1024 x 512',
                '1536 x 640',
                '1344 x 768',
                '1216 x 832',
                '1152 x 896',
                '1024 x 1024',
            ],
            {
            "default": '512 x 512'
             }),
           
            "invert": ("BOOLEAN", {"default": False}),
            "batch_size": ("INT", {
            "default": 1,
            "min": 1,
            "max": 4096
            }),
        },
        }

    RETURN_TYPES = ("LATENT", "INT", "INT")
    RETURN_NAMES = ("Latent", "Width", "Height")
    FUNCTION = "generate"
    CATEGORY = "KJNodes"

    def generate(self, dimensions, invert, batch_size):
        from nodes import EmptyLatentImage
        result = [x.strip() for x in dimensions.split('x')]
        
        if invert:
            width = int(result[1].split(' ')[0])
            height = int(result[0])
        else:
            width = int(result[0])
            height = int(result[1].split(' ')[0])
        latent = EmptyLatentImage().generate(width, height, batch_size)[0]

        return (latent, int(width), int(height),)

```
