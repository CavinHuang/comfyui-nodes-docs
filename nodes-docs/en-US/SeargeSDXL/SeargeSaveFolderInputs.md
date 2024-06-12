---
tags:
- Searge
---

# Save Folder
## Documentation
- Class name: `SeargeSaveFolderInputs`
- Category: `Searge/_deprecated_/Inputs`
- Output node: `False`

This node is designed to handle input related to saving files in a specific folder, allowing users to specify the destination for saved files within a deprecated Searge module.
## Input types
### Required
- **`save_to`**
    - Specifies the destination folder where files should be saved. This parameter plays a crucial role in determining the output path for saved files.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`save_to`**
    - Comfy dtype: `SAVE_FOLDER`
    - Returns the specified destination folder for saving files, reflecting the user's input.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeSaveFolderInputs:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "save_to": (SeargeParameterProcessor.SAVE_TO, {"default": SeargeParameterProcessor.SAVE_TO[0]}),
        },
        }

    RETURN_TYPES = ("SAVE_FOLDER",)
    RETURN_NAMES = ("save_to",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Inputs"

    def get_value(self, save_to):
        return (save_to,)

```
