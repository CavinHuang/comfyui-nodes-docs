---
tags:
- Color
---

# Color Clip (advanced)
## Documentation
- Class name: `Color Clip (advanced)`
- Category: `Bmad/image`
- Output node: `False`

This node specializes in adjusting the colors within an image based on a set of advanced criteria, including the ability to target specific colors for transformation or to apply complementary color adjustments. It extends basic color clipping functionalities by allowing for more nuanced control over color manipulation, enabling the creation of highly customized visual effects.
## Input types
### Required
- **`image`**
    - The image to be processed for color clipping. It serves as the primary input on which color transformations are applied, determining the visual outcome of the operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`target`**
    - Specifies the desired color transformation for the targeted areas of the image. It defines how the reference color areas should be altered.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`complement`**
    - Determines the color transformation for areas of the image not matching the reference color. It allows for differential treatment of image regions based on color matching.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`color`**
    - The reference color that guides the clipping operation. It is used to identify which parts of the image should be targeted for color transformation.
    - Comfy dtype: `COLOR`
    - Python dtype: `List[int]`
### Optional
- **`color_a`**
    - An optional color parameter that provides an additional color option for transformation. It offers further customization for the clipping operation.
    - Comfy dtype: `COLOR`
    - Python dtype: `List[int]`
- **`color_b`**
    - Another optional color parameter that provides an alternative color option for transformation, enhancing the flexibility of the color clipping process.
    - Comfy dtype: `COLOR`
    - Python dtype: `List[int]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the color clipping operation. It reflects the applied color transformations, showcasing the visual effects achieved through the process.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ColorClipAdvanced(ColorClip):
    @classmethod
    def INPUT_TYPES(s):
        return super().get_types(advanced=True)

    def color_clip(self, image, color, target, complement, color_a=None, color_b=None):
        image = self.clip(image, color, target, complement, color_a, color_b)
        return (image,)

```
