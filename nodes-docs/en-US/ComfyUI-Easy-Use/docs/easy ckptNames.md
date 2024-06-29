---
tags:
- Checkpoint
---

# Ckpt Names
## Documentation
- Class name: `easy ckptNames`
- Category: `EasyUse/Util`
- Output node: `False`

This node is designed to facilitate the selection and management of checkpoint names within a pipeline, allowing users to easily specify and retrieve the names of various checkpoints for use in model loading or other operations that require specific checkpoint identification.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the name of the checkpoint to be selected or managed. This parameter is crucial for identifying which checkpoint is to be used in subsequent operations, impacting the node's execution and results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`ckpt_name`**
    - Comfy dtype: `*`
    - Returns the specified checkpoint name, enabling its use in further processing or model loading operations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class setCkptName:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"),),
            }
        }

    RETURN_TYPES = (AlwaysEqualProxy('*'),)
    RETURN_NAMES = ("ckpt_name",)
    FUNCTION = "set_name"
    CATEGORY = "EasyUse/Util"

    def set_name(self, ckpt_name):
        return (ckpt_name,)

```
