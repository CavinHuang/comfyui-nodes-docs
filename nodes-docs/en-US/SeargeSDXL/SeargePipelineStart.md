---
tags:
- Searge
---

# Magic Box Pipeline Start
## Documentation
- Class name: `SeargePipelineStart`
- Category: `Searge/Magic`
- Output node: `True`

This node initiates the pipeline for data processing, setting up the initial conditions and configurations necessary for the workflow to proceed. It prepares the data stream by merging any additional data provided, configures pipeline settings based on the workflow version, and updates the pipeline with hidden and version-specific information.
## Input types
### Required
- **`wf_version`**
    - Specifies the version of the workflow to be used, determining the configuration and behavior of the pipeline.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`data`**
    - The primary data stream to be processed by the pipeline. This data can be augmented with additional data if provided.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Dict`
- **`additional_data`**
    - Optional data that can be merged with the primary data stream for enhanced processing capabilities.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Dict`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - The processed data stream, ready for further stages in the pipeline.
    - Python dtype: `Tuple[Dict]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargePipelineStart:
    def __init__(self):
        self.pipeline = Pipeline()

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "wf_version": (Defs.WORKFLOW_VERSIONS,),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
                "additional_data": ("SRG_DATA_STREAM",),
            },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO",
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "trigger"

    OUTPUT_NODE = True

    CATEGORY = UI.CATEGORY_MAGIC

    def trigger(self, wf_version, data=None, additional_data=None, prompt=None, extra_pnginfo=None):
        if data is None:
            print("Warning: Pipeline Start - missing data stream")
        else:
            if additional_data is not None:
                data = data | additional_data

            self.pipeline.start(data)

            access = PipelineAccess(data)

            self.pipeline.enable(access.get_active_setting(UI.S_OPERATING_MODE, UI.F_WORKFLOW_MODE) != UI.NONE)

            mb_hidden = {
                Names.F_MAGIC_BOX_PROMPT: prompt,
                Names.F_MAGIC_BOX_EXTRA_PNGINFO: extra_pnginfo,
            }

            mb_version = {
                Names.F_MAGIC_BOX_EXTENSION: Defs.VERSION,
                Names.F_MAGIC_BOX_WORKFLOW: wf_version,
            }

            access.update_in_pipeline(Names.S_MAGIC_BOX_HIDDEN, mb_hidden)
            access.update_in_pipeline(Names.S_MAGIC_BOX_VERSION, mb_version)

            if data is not None:
                data[Names.S_MAGIC_BOX_HIDDEN] = mb_hidden
                data[Names.S_MAGIC_BOX_VERSION] = mb_version

        return (data,)

```
