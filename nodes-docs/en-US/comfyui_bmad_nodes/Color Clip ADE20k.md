---
tags:
- Color
---

# Color Clip ADE20k
## Documentation
- Class name: `Color Clip ADE20k`
- Category: `Bmad/image`
- Output node: `False`

This node specializes in adjusting the color of images based on the ADE20K dataset, allowing for specific class-based color clipping. It modifies the color of an image to match predefined colors associated with ADE20K class names, enhancing image aesthetics or utility for visualization and analysis.
## Input types
### Required
- **`image`**
    - The image to be color clipped. It serves as the base for color modification, where the clipping operation will be applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`target`**
    - Defines the target operation for the color clipping, such as converting to black, white, or maintaining the original color.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`complement`**
    - Specifies the complementary operation to the target, offering additional control over the color clipping process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`class_name`**
    - Specifies the ADE20K class name whose associated color will be used for clipping. This determines the target color for the clipping operation, aligning the image's aesthetic with the class's typical color.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the color clipping operation, showcasing the applied color adjustments.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorClipADE20K(ColorClip):
    @classmethod
    def INPUT_TYPES(s):
        types = super().get_types(advanced=False)
        types["required"].pop("color")
        types["required"]["class_name"] = (ade20k_class_names, {"default": 'animal, animate being, beast, brute, creature, fauna'})
        return types

    def color_clip(self, image, class_name, target, complement):
        clip_color = list((ADE20K_dic[class_name]*255).astype(np.uint8))
        image = self.clip(image, clip_color, target, complement)
        return (image,)

```
