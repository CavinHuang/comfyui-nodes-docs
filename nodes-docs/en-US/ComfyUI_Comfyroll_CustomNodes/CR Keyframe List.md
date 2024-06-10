---
tags:
- AnimationScheduling
- Scheduling
---

# 📝 CR Keyframe List
## Documentation
- Class name: `CR Keyframe List`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📝 Prompt`
- Output node: `False`

This node is designed to process and format a list of keyframes for animation purposes, providing a structured way to define animation sequences and their formats. It also offers a link to further help and documentation on how to use the node effectively.
## Input types
### Required
- **`keyframe_list`**
    - A multiline string representing a list of keyframes. This list is essential for defining the sequence of frames in an animation, where each keyframe specifies a significant point in the animation that will be interpolated between by the animation software.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`keyframe_format`**
    - Specifies the format of the keyframes, allowing for different animation frameworks or custom formats to be used. This flexibility ensures compatibility with various animation tools and workflows.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`keyframe_list`**
    - Comfy dtype: `STRING`
    - Returns the processed list of keyframes, ready for use in animation sequences.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to further documentation and help for using the node, facilitating user understanding and effective utilization.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_KeyframeList:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "keyframe_list": ("STRING", {"multiline": True, "default": "keyframes"}),       
                    "keyframe_format": (["Deforum","CR"],),
                }
        }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("keyframe_list", "show_help", )
    FUNCTION = "keyframelist"
    CATEGORY = icons.get("Comfyroll/Animation/Prompt")

    def keyframelist(self, keyframe_list, keyframe_format):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Prompt-Nodes#cr-keyframe-list"          
        return (keyframe_list, show_help, )

```
