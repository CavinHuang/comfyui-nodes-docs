---
tags:
- Animation
- Image
---

# 🛠️ CR Current Frame
## Documentation
- Class name: `CR Current Frame`
- Category: `🧩 Comfyroll Studio/🎥 Animation/🛠️ Utils`
- Output node: `False`

The CR Current Frame node is designed to manage and optionally display the current frame index within an animation sequence. It allows for the adjustment of the frame index and provides an option to print the current frame index to the console, facilitating debugging and tracking of animation progress.
## Input types
### Required
- **`index`**
    - Specifies the current frame index. It is crucial for determining the specific frame being processed or displayed in the animation sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_to_console`**
    - Determines whether the current frame index should be printed to the console. This is useful for debugging purposes and tracking the progress of the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`index`**
    - Comfy dtype: `INT`
    - Returns the current frame index. This is essential for tracking the progress of the animation and for further processing of the specific frame.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_CurrentFrame:

    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                    "index": ("INT", {"default": 1, "min": -10000, "max": 10000}),
                    "print_to_console": (["Yes","No"],),
                    }
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("index",)
    FUNCTION = "to_console"
    CATEGORY = icons.get("Comfyroll/Animation/Utils")
    
    def to_console(self, index, print_to_console):
        if print_to_console == "Yes":
            print(f"[Info] CR Current Frame:{index}")
            
        return (index, )

```
