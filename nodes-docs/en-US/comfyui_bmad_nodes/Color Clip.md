---
tags:
- Color
---

# Color Clip
## Documentation
- Class name: `Color Clip`
- Category: `Bmad/image`
- Output node: `False`

The Color Clip node is designed to modify the colors within an image based on specific target and complement operations, potentially using additional color parameters for advanced adjustments. It abstracts the complexity of color manipulation, offering a straightforward way to achieve desired visual effects.
## Input types
### Required
- **`image`**
    - The image to be processed is the primary input for color manipulation, determining the visual output of the node. Changes to the image's colors are directly influenced by the operations and color parameters specified.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`target`**
    - Specifies the target operation for color manipulation, such as converting to black or white, or applying no change. It defines the primary action to be performed on the image's colors, directly affecting the visual outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`complement`**
    - Defines the complementary operation to the target, offering an additional layer of color adjustment. This parameter works in conjunction with the target to refine the color effects achieved, impacting the final appearance of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`color`**
    - The base color used for manipulation in the image. It plays a crucial role in determining the outcome of the color clip operation, as it sets the reference for color adjustments.
    - Comfy dtype: `COLOR`
    - Python dtype: `List[int]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after color manipulation. It reflects the changes made based on the specified target, complement, and color parameters, showcasing the effect of the operations and adjustments applied.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorClipSimple(ColorClip):
    @classmethod
    def INPUT_TYPES(s):
        return super().get_types(advanced=False)

    def color_clip(self, image, color, target, complement):
        image = self.clip(image, color, target, complement)
        return (image,)

```
