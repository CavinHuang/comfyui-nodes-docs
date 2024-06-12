---
tags:
- Searge
---

# Magic Box Pipeline Terminator
## Documentation
- Class name: `SeargePipelineTerminator`
- Category: `Searge/Magic`
- Output node: `True`

This node is designed to terminate an ongoing pipeline within the ComfyUI SDXL environment, effectively halting any further processing or data manipulation within that pipeline.
## Input types
### Required
### Optional
- **`data`**
    - An optional data stream that may contain pipeline-specific information or states to be terminated. It's used to access and terminate the specific pipeline instance.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `SRG_DATA_STREAM`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargePipelineTerminator:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
            },
        }

    RETURN_TYPES = ()
    FUNCTION = "trigger"

    OUTPUT_NODE = True

    CATEGORY = UI.CATEGORY_MAGIC

    def trigger(self, data=None):
        access = PipelineAccess(data)
        access.terminate_pipeline()
        return {}

```
