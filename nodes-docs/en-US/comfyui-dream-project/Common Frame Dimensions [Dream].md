---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# ⌗ Common Frame Dimensions
## Documentation
- Class name: `Common Frame Dimensions [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`

The Common Frame Dimensions node provides a utility for calculating frame dimensions based on a set of input parameters including size, aspect ratio, orientation, divisor, and alignment. It abstracts the complexity of dimension calculations and alignment adjustments, offering a streamlined way to determine optimal frame sizes for various display requirements.
## Input types
### Required
- **`size`**
    - Specifies the desired frame size from a predefined list of resolutions. This choice influences the overall dimensions of the frame, serving as a base for further calculations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`aspect_ratio`**
    - Determines the frame's aspect ratio, affecting its width and height proportionally to ensure the specified ratio is maintained.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`orientation`**
    - Indicates the frame's orientation (wide or tall), which influences the calculation of width and height based on the aspect ratio.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`divisor`**
    - A factor used to divide the frame dimensions for finer control over size granularity, affecting the final dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`alignment`**
    - Specifies the alignment value for dimension calculations, ensuring that the final dimensions are aligned to a certain boundary.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alignment_type`**
    - Determines how the final dimensions are rounded (up, down, or to the nearest) based on the alignment value.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The calculated width of the frame after considering all input parameters.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The calculated height of the frame after considering all input parameters.
    - Python dtype: `int`
- **`final_width`**
    - Comfy dtype: `INT`
    - The final width of the frame, adjusted according to the alignment and alignment type.
    - Python dtype: `int`
- **`final_height`**
    - Comfy dtype: `INT`
    - The final height of the frame, adjusted according to the alignment and alignment type.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamFrameDimensions:
    NODE_NAME = "Common Frame Dimensions"
    ICON = "⌗"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "size": (["3840", "1920", "1440", "1280", "768", "720", "640", "512"],),
                "aspect_ratio": (["16:9", "16:10", "4:3", "1:1", "5:4", "3:2", "21:9", "14:9"],),
                "orientation": (["wide", "tall"],),
                "divisor": (["8", "4", "2", "1"],),
                "alignment": ("INT", {"default": 64, "min": 1, "max": 512}),
                "alignment_type": (["ceil", "floor", "nearest"],),
            },
        }

    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("INT", "INT", "INT", "INT")
    RETURN_NAMES = ("width", "height", "final_width", "final_height")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, size, aspect_ratio, orientation, divisor, alignment, alignment_type):
        ratio = tuple(map(int, aspect_ratio.split(":")))
        final_width = int(size)
        final_height = int(round((float(final_width) * ratio[1]) / ratio[0]))
        width = _align_num(int(round(final_width / float(divisor))), alignment, alignment_type)
        height = _align_num(int(round((float(width) * ratio[1]) / ratio[0])), alignment, alignment_type)
        if orientation == "wide":
            return (width, height, final_width, final_height)
        else:
            return (height, width, final_height, final_width)

```
