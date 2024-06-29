---
tags:
- Time
---

# Show Spent Time
## Documentation
- Class name: `easy showSpentTime`
- Category: `EasyUse/Util`
- Output node: `True`

The `showSpentTime` node is designed to display the time spent on a particular operation within a pipeline. It captures and reports the duration of specific tasks, aiding in performance analysis and optimization.
## Input types
### Required
- **`pipe`**
    - The `pipe` parameter represents the pipeline context, providing essential information about the current state and settings of the pipeline, including time-related data.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`spent_time`**
    - The `spent_time` parameter optionally specifies the time spent on the operation. If not provided, the node will attempt to calculate or retrieve this information from the pipeline context.
    - Comfy dtype: `INFO`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class showSpentTime:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE_LINE",),
                "spent_time": ("INFO", {"default": 'Time will be displayed when reasoning is complete', "forceInput": False}),
            },
            "hidden": {
                "unique_id": "UNIQUE_ID",
                "extra_pnginfo": "EXTRA_PNGINFO",
            },
        }

    FUNCTION = "notify"
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    RETURN_NAMES = ()

    CATEGORY = "EasyUse/Util"

    def notify(self, pipe, spent_time=None, unique_id=None, extra_pnginfo=None):
        if unique_id and extra_pnginfo and "workflow" in extra_pnginfo:
            workflow = extra_pnginfo["workflow"]
            node = next((x for x in workflow["nodes"] if str(x["id"]) == unique_id), None)
            if node:
                spent_time = pipe['loader_settings']['spent_time'] if 'spent_time' in pipe['loader_settings'] else ''
                node["widgets_values"] = [spent_time]

        return {"ui": {"text": spent_time}, "result": {}}

```
