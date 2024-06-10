---
tags:
- AnimationScheduling
- Frame
---

# Frame Concatenate 📅🅕🅝
## Documentation
- Class name: `FizzFrameConcatenate`
- Category: `FizzNodes 📅🅕🅝/FrameNodes`
- Output node: `False`

The FizzFrameConcatenate node is designed to concatenate frame-related information, specifically focusing on combining text and frame data to construct a comprehensive frame narrative. It operates by merging positive and negative textual content with frame identifiers, facilitating the creation of a structured and detailed frame representation.
## Input types
### Required
- **`frame`**
    - The frame input serves as the central data structure around which the concatenation process revolves, containing all necessary information for constructing the narrative.
    - Comfy dtype: `FIZZFRAME`
    - Python dtype: `dict`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - A concatenated string of frame identifiers and their associated texts, structured to represent a comprehensive narrative across multiple frames.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FrameConcatenate:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "frame": ("FIZZFRAME", {"forceInput": True})
            },
        }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "frame_concatenate"

    CATEGORY = "FizzNodes 📅🅕🅝/FrameNodes"

    def frame_concatenate(self, frame):
        text_list = ""
        for frame_digit in frame.frames:
            new_frame = frame.frames[frame_digit]
            text_list += f'"{frame_digit}": "{new_frame["positive_text"]}'
            if new_frame.get("general_positive"):
                text_list += f', {new_frame["general_positive"]}'
            if new_frame.get("negative_text") or new_frame.get("general_negative"):
                text_list += f', --neg '
                if new_frame.get("negative_text"):
                    text_list += f', {new_frame["negative_text"]}'
                if new_frame.get("general_negative"):
                    text_list += f', {new_frame["general_negative"]}'
            text_list += f'",\n'
        text_list = text_list[:-2]

        return (text_list,)

```
