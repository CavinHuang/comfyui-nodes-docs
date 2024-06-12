---
tags:
- Image
---

# MonoMerge
## Documentation
- Class name: `MonoMerge`
- Category: `Bmad/image`
- Output node: `False`

The MonoMerge node is designed for merging two images into a monochromatic image based on a target color scheme (either towards white or black). This process involves comparing the luminance of corresponding pixels from both images and selecting the one that aligns with the target color scheme, thereby creating a new image that emphasizes either the lighter or darker aspects of the combined images.
## Input types
### Required
- **`image1`**
    - The first image to be merged. It plays a crucial role in the merging process as its pixels are compared with those of the second image to determine the final image based on the target color scheme.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image2`**
    - The second image to be merged. It is equally important as the first image, as its pixels are compared with those of the first image to create the final monochromatic image according to the target color scheme.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`target`**
    - Specifies the target color scheme for the merge, either 'white' or 'black'. This determines whether the merge emphasizes lighter or darker aspects of the images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`output_format`**
    - Defines the output format of the merged image, allowing for flexibility in how the result is utilized or displayed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a monochromatic image that combines elements of the input images according to the specified target color scheme, either emphasizing lighter or darker tones.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MonoMerge:
    target = ["white", "black"]

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image1": ("IMAGE",),
                "image2": ("IMAGE",),
                "target": (s.target, {"default": "white"}),
                "output_format": (image_output_formats_options, {
                    "default": image_output_formats_options[0]
                })
                ,
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "monochromatic_merge"
    CATEGORY = "Bmad/image"

    def monochromatic_merge(self, image1, image2, target, output_format):
        image1 = tensor2opencv(image1, 1)
        image2 = tensor2opencv(image2, 1)

        # Select the lesser L component at each pixel
        if target == "white":
            image = np.maximum(image1, image2)
        else:
            image = np.minimum(image1, image2)

        image = maybe_convert_img(image, 1, image_output_formats_options_map[output_format])
        image = opencv2tensor(image)

        return (image,)

```
