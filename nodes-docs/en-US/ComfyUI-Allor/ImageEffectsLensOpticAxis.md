---
tags:
- LensEffects
- VisualEffects
---

# ImageEffectsLensOpticAxis
## Documentation
- Class name: `ImageEffectsLensOpticAxis`
- Category: `image/effects/lens`
- Output node: `False`

This node applies a lens optic axis effect to images, manipulating their appearance based on parameters like lens shape, edge, curvy, zoom, brightness, and saturation. It creates a mask to selectively apply transformations, simulating the optical axis effect of a lens on the input images.
## Input types
### Required
- **`images`**
    - The input images to which the lens optic axis effect will be applied. This parameter is crucial as it serves as the base for the effect application.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`lens_shape`**
    - Defines the shape of the lens effect applied to the images, influencing the overall appearance of the optic axis effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lens_edge`**
    - Specifies the edge behavior of the lens effect, determining how the effect fades or transitions at the boundaries of the images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lens_curvy`**
    - Adjusts the curvature of the lens effect, allowing for customization of the optic axis effect's intensity and shape.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lens_zoom`**
    - Controls the zoom level of the lens effect, affecting the scale and intensity of the optic axis effect on the images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lens_aperture`**
    - Determines the aperture size of the lens effect, influencing the depth of field and focus area in the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`blur_intensity`**
    - Sets the intensity of the blur effect applied alongside the lens optic axis effect, contributing to the overall visual simulation of a camera lens.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The images after the application of the lens optic axis effect, showcasing the transformed appearance.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The mask used to apply the lens optic axis effect, indicating the areas of the images affected by the transformation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsLensOpticAxis:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "lens_shape": (["circle", "square", "rectangle", "corners"],),
                "lens_edge": (["around", "symmetric"],),
                "lens_curvy": ("FLOAT", {
                    "default": 4.0,
                    "max": 15.0,
                    "step": 0.1,
                }),
                "lens_zoom": ("FLOAT", {
                    "default": 2.0,
                    "step": 0.1,
                }),
                "lens_aperture": ("FLOAT", {
                    "default": 0.5,
                    "max": 10.0,
                    "step": 0.1,
                }),
                "blur_intensity": ("INT", {
                    "default": 30,
                    "min": 2,
                    "step": 2
                }),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "node"
    CATEGORY = "image/effects/lens"

    def node(self, images, lens_shape, lens_edge, lens_curvy, lens_zoom, lens_aperture, blur_intensity):
        blur_intensity -= 1
        lens_zoom += 1

        height, width = images[0, :, :, 0].shape

        if lens_edge == "around":
            mask = radialspace_2D((height, width), lens_curvy, lens_zoom, lens_shape, 0.0, 1.0 + lens_curvy).unsqueeze(0).unsqueeze(3)
        elif lens_edge == "symmetric":
            if height != width:
                new_height = new_width = max(height, width)
                crop_top_bottom = (new_height - height) // 2
                crop_left_right = (new_width - width) // 2

                mask = radialspace_2D((new_height, new_width), lens_curvy, lens_zoom, lens_shape, 0.0, 1.0 + lens_curvy)[
                   crop_top_bottom:-crop_top_bottom or None,
                   crop_left_right:-crop_left_right or None
                ].unsqueeze(0).unsqueeze(3)
            else:
                mask = radialspace_2D((height, width), lens_curvy, lens_zoom, lens_shape, 0.0, 1.0 + lens_curvy).unsqueeze(0).unsqueeze(3)
        else:
            raise ValueError("Not existing lens_edge parameter.")

        center_x = width // 2
        center_y = height // 2

        y_v, x_v = torch.meshgrid(torch.arange(height), torch.arange(width), indexing='ij')

        dx = x_v - center_x
        dy = y_v - center_y

        distance = torch.sqrt(dx ** 2 + dy ** 2)

        map_x = x_v + mask[0, :, :, 0] * dx / distance * (-lens_aperture * 100)
        map_y = y_v + mask[0, :, :, 0] * dy / distance * (-lens_aperture * 100)

        map_x = map_x.to(torch.float32).numpy()
        map_y = map_y.to(torch.float32).numpy()

        shifted_images = cv2_layer(images, lambda x: cv2.remap(x, map_x, map_y, cv2.INTER_LINEAR))
        shifted_mask = cv2_layer(mask, lambda x: cv2.remap(x, map_x, map_y, cv2.INTER_LINEAR))
        edited_images = cv2_layer(shifted_images, lambda x: cv2.stackBlur(x, (blur_intensity, blur_intensity)))

        mask = torch.clamp(mask, 0.0, 1.0)
        shifted_mask = torch.clamp(shifted_mask, 0.0, 1.0)

        result = shifted_images * (1 - mask) + edited_images * mask

        return result, shifted_mask

```
