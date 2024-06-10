---
tags:
- Checkpoint
---

# Checkpoint Name Selector
## Documentation
- Class name: `CheckpointNameSelector`
- Category: `Art Venture/Utils`
- Output node: `False`

The CheckpointNameSelector node is designed to facilitate the selection of checkpoint names from a predefined list, streamlining the process of identifying and utilizing specific checkpoints within a workflow.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the name of the checkpoint to be selected. This parameter is crucial for determining which checkpoint is to be utilized in subsequent operations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`ckpt_name`**
    - Comfy dtype: `COMBO[STRING]`
    - Returns the selected checkpoint name, enabling its use in further processing or operations.
    - Python dtype: `str`
- **`ckpt_name_str`**
    - Comfy dtype: `STRING`
    - Provides the selected checkpoint name as a string, facilitating its integration into workflows that require textual representation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilCheckpointSelector:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
            }
        }

    RETURN_TYPES = (folder_paths.get_filename_list("checkpoints"), "STRING")
    RETURN_NAMES = ("ckpt_name", "ckpt_name_str")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "get_ckpt_name"

    def get_ckpt_name(self, ckpt_name):
        return (ckpt_name, ckpt_name)

```
