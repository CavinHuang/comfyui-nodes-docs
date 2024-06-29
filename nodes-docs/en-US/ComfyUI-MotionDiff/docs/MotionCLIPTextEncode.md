---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# MotionCLIP Text Encode
## Documentation
- Class name: `MotionCLIPTextEncode`
- Category: `MotionDiff`
- Output node: `False`

The MotionCLIPTextEncode node is designed to encode textual descriptions into a format suitable for motion generation tasks, leveraging a CLIP model and motion data to produce motion conditioning. This process facilitates the creation of motion sequences that are aligned with the given textual descriptions.
## Input types
### Required
- **`md_clip`**
    - The md_clip parameter represents a CLIP model tailored for motion data, crucial for interpreting and encoding the textual description in the context of motion.
    - Comfy dtype: `MD_CLIP`
    - Python dtype: `MD_CLIP`
- **`motion_data`**
    - The motion_data parameter contains the motion information necessary for the encoding process, providing the context in which the text is to be interpreted.
    - Comfy dtype: `MOTION_DATA`
    - Python dtype: `MOTION_DATA`
- **`text`**
    - The text parameter is the textual description to be encoded, serving as the input for generating motion-aligned sequences.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`md_conditioning`**
    - Comfy dtype: `MD_CONDITIONING`
    - The output is motion conditioning data, which is used to guide the generation of motion sequences that correspond to the input text.
    - Python dtype: `MD_CONDITIONING`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MotionCLIPTextEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "md_clip": ("MD_CLIP", ),
                "motion_data": ("MOTION_DATA", ),
                "text": ("STRING", {"default": "a person performs a cartwheel" ,"multiline": True})
            },
        }

    RETURN_TYPES = ("MD_CONDITIONING",)
    CATEGORY = "MotionDiff"
    FUNCTION = "encode_text"

    def encode_text(self, md_clip, motion_data, text):
        return (md_clip(text, motion_data), )

```
