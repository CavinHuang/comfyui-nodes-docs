---
tags:
- Searge
---

# Operating Mode v2
## Documentation
- Class name: `SeargeOperatingMode`
- Category: `Searge/UI/Inputs`
- Output node: `False`

The SeargeOperatingMode node is designed to configure and manage the operating modes within the ComfyUI environment, specifically tailored for the SDXL suite. It allows for the dynamic adjustment of workflow and prompting modes, as well as batch processing sizes, thereby facilitating a flexible and customizable user interaction experience.
## Input types
### Required
- **`workflow_mode`**
    - Specifies the workflow mode, determining the overall process flow and operations available within the UI, such as text-to-image or image-to-image conversions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Enum['none', 'text-to-image', 'image-to-image', 'in-painting']`
- **`prompting_mode`**
    - Defines the prompting mode, influencing how users are prompted for input and how that input is processed and utilized within the system.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Enum['default - all prompts', 'main and neg. only', 'main, sec., and neg.', 'all except sec.', 'ignore empty', 'ignore all']`
- **`batch_size`**
    - Determines the number of items to be processed in a single batch, allowing for efficient bulk processing of tasks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`data`**
    - Optional data stream for additional configurations or parameters that may be required by the operating mode.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Dict`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - The configured data stream, enriched with the selected operating mode settings.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeOperatingMode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "workflow_mode": (UI.WORKFLOW_MODES, {"default": UI.WF_MODE_TEXT_TO_IMAGE},),
                "prompting_mode": (UI.PROMPTING_MODES, {"default": UI.PROMPTING_DEFAULT},),
                "batch_size": ("INT", {"default": 1, "min": 1, "max": 4, "step": 1},),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "get"

    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(workflow_mode, prompting_mode, batch_size):
        return {
            UI.F_WORKFLOW_MODE: workflow_mode,
            UI.F_PROMPTING_MODE: prompting_mode,
            UI.F_BATCH_SIZE: batch_size,
        }

    def get(self, workflow_mode, prompting_mode, batch_size, data=None):
        if data is None:
            data = {}

        data[UI.S_OPERATING_MODE] = self.create_dict(
            workflow_mode,
            prompting_mode,
            batch_size,
        )

        return (data,)

```
