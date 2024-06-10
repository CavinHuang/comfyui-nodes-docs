---
tags:
- LensEffects
- VisualEffects
---

# ImageEffectsLensVignette
## Documentation
- Class name: `ImageEffectsLensVignette`
- Category: `image/effects/lens`
- Output node: `False`

The `ImageEffectsLensVignette` node applies a vignette effect to images, simulating the reduction in brightness or saturation at the periphery compared to the image center. This effect mimics the characteristic appearance of photographs taken with certain types of camera lenses, adding a sense of depth or focus to the central subject of the image.
## Input types
### Required
- **`images`**
    - The input images to which the vignette effect will be applied. This parameter is crucial for defining the base content that will undergo the transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`lens_shape`**
    - Defines the shape of the vignette effect, influencing how the brightness or saturation fades towards the edges of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lens_edge`**
    - Specifies the edge behavior of the vignette effect, determining how the effect is applied around or symmetrically across the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lens_curvy`**
    - Adjusts the curvature of the vignette effect, allowing for more creative control over the transition from center to edge.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lens_zoom`**
    - Controls the zoom level of the vignette effect, affecting the area of the image that remains unaffected by the vignetting.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`brightness`**
    - Adjusts the overall brightness of the image, enhancing the visual impact of the vignette effect by modifying the light levels.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`saturation`**
    - Modifies the saturation level of the image, complementing the vignette effect by altering the intensity of colors.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after applying the vignette effect, showcasing the enhanced focus on the central subject through the controlled fading of edges.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The mask used to apply the vignette effect, indicating the areas of the image affected by the transformation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsLensVignette:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "lens_shape": (["circle", "rectangle"],),
                "lens_edge": (["around", "symmetric"],),
                "lens_curvy": ("FLOAT", {
                    "default": 3.0,
                    "max": 15.0,
                    "step": 0.1,
                }),
                "lens_zoom": ("FLOAT", {
                    "default": 0.0,
                    "step": 0.1,
                }),
                "brightness": ("FLOAT", {
                    "default": 0.25,
                    "max": 1.0,
                    "step": 0.01
                }),
                "saturation": ("FLOAT", {
                    "default": 0.5,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "node"
    CATEGORY = "image/effects/lens"

    def node(self, images, lens_shape, lens_edge, lens_curvy, lens_zoom, brightness, saturation):
        tensor = images.clone().detach()

        lens_zoom += 1

        height, width = tensor[0, :, :, 0].shape

        if lens_edge == "around":
            mask = radialspace_2D((height, width), lens_curvy, lens_zoom, lens_shape).unsqueeze(0).unsqueeze(3)
        elif lens_edge == "symmetric":
            if height != width:
                new_height = new_width = max(height, width)
                crop_top_bottom = (new_height - height) // 2
                crop_left_right = (new_width - width) // 2

                mask = radialspace_2D((new_height, new_width), lens_curvy, lens_zoom, lens_shape)[
                       crop_top_bottom:-crop_top_bottom or None,
                       crop_left_right:-crop_left_right or None
                ].unsqueeze(0).unsqueeze(3)
            else:
                mask = radialspace_2D((height, width), lens_curvy, lens_zoom, lens_shape).unsqueeze(0).unsqueeze(3)
        else:
            raise ValueError("Not existing lens_edge parameter.")

        tensor = tensor.permute(0, 3, 1, 2)
        tensor[:, 0:3, :, :] = F.adjust_brightness(tensor[:, 0:3, :, :], brightness)
        tensor[:, 0:3, :, :] = F.adjust_saturation(tensor[:, 0:3, :, :], saturation)
        tensor = tensor.permute(0, 2, 3, 1)

        result = images * (1 - mask) + tensor * mask

        mask = mask.squeeze()

        return result, mask

```
