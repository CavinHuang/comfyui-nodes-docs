---
tags:
- Checkpoint
---

# Checkpoint Selector
## Documentation
- Class name: `Checkpoint Selector`
- Category: `ImageSaverTools/utils`
- Output node: `False`

The Checkpoint Selector node is designed to facilitate the selection of checkpoint files from a predefined list. It abstracts the process of identifying and choosing the appropriate checkpoint file for operations such as model loading or initialization, streamlining the workflow for tasks that require specific checkpoint configurations.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint file name to be selected. This parameter is crucial for determining which checkpoint file is to be used for subsequent operations, effectively guiding the node's output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`ckpt_name`**
    - Comfy dtype: `COMBO[STRING]`
    - Returns the selected checkpoint file name. This output is essential for downstream tasks that require a specific checkpoint file, such as model loading or further processing.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CheckpointSelector:
    CATEGORY = 'ImageSaverTools/utils'
    RETURN_TYPES = (folder_paths.get_filename_list("checkpoints"),)
    RETURN_NAMES = ("ckpt_name",)
    FUNCTION = "get_names"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),}}

    def get_names(self, ckpt_name):
        return (ckpt_name,)

```
