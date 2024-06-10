---
tags:
- Image
- SDXLSettings
---

# Is SDXL
## Documentation
- Class name: `easy isSDXL`
- Category: `EasyUse/Logic`
- Output node: `False`

The `easy isSDXL` node is designed to determine if the current model configuration or environment is set to use the SDXL (Stable Diffusion XL) model. This node abstractly assesses the operational context to ensure compatibility or optimize settings for utilizing the SDXL model, facilitating seamless integration or transition between different model scales.
## Input types
### Required
### Optional
- **`optional_pipe`**
    - An optional parameter that allows specifying a pipeline configuration. Its presence can influence the determination process by providing context about the operational pipeline.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Optional[Dict]`
- **`optional_clip`**
    - An optional parameter that allows specifying a CLIP model configuration. Its inclusion can affect the determination process by providing additional context about the model environment.
    - Comfy dtype: `CLIP`
    - Python dtype: `Optional[Dict]`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - Indicates whether the current model configuration or environment is set to use the SDXL model, returning a boolean value.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class isSDXL:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {},
            "optional": {
                "optional_pipe": ("PIPE_LINE",),
                "optional_clip": ("CLIP",),
            }
        }

    RETURN_TYPES = ("BOOLEAN",)
    RETURN_NAMES = ("boolean",)
    FUNCTION = "execute"
    CATEGORY = "EasyUse/Logic"

    def execute(self, optional_pipe=None, optional_clip=None):
        if optional_pipe is None and optional_clip is None:
            raise Exception(f"[ERROR] optional_pipe or optional_clip is missing")
        clip = optional_clip if optional_clip is not None else optional_pipe['clip']
        if isinstance(clip.cond_stage_model, (SDXLClipModel, SDXLRefinerClipModel, SDXLClipG)):
            return (True,)
        else:
            return (False,)

```
