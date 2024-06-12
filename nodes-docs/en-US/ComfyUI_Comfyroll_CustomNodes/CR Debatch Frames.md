---
tags:
- Animation
- Image
---

# 🛠️ CR Debatch Frames
## Documentation
- Class name: `CR Debatch Frames`
- Category: `🧩 Comfyroll Studio/🎥 Animation/🛠️ Utils`
- Output node: `False`

The CR_DebatchFrames node is designed to transform a batch of image frames into a list of individual frames, facilitating frame-by-frame processing or analysis within animation workflows.
## Input types
### Required
- **`frames`**
    - The 'frames' parameter represents a batch of image frames to be debatched into individual frames. This is essential for operations that require handling each frame separately, such as animation frame processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`debatched_frames`**
    - Comfy dtype: `IMAGE`
    - A list of individual image frames, each extracted from the input batch. This allows for frame-by-frame manipulation or analysis.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_DebatchFrames:
   # cloned from ltdrdata Image Batch To Image List node
   
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "frames": ("IMAGE",), } }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("debatched_frames",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "debatch"
    CATEGORY = icons.get("Comfyroll/Animation/Utils")

    def debatch(self, frames):
        images = [frames[i:i + 1, ...] for i in range(frames.shape[0])]
        return (images, )

```
