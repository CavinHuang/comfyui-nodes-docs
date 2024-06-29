---
tags:
- ConditionalSelection
- ImpactPack
---

# ImpactLogger
## Documentation
- Class name: `ImpactLogger`
- Category: `ImpactPack/Debug`
- Output node: `True`

The ImpactLogger node is designed for debugging purposes within the ImpactPack. It logs data, including its shape if applicable, along with a specified prompt and additional PNG information, to the console. This functionality aids in tracking and understanding the flow of data and operations within a workflow.
## Input types
### Required
- **`data`**
    - The primary data to be logged. Its shape is logged if available, providing insights into the data structure being processed.
    - Comfy dtype: `*`
    - Python dtype: `object`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactLogger:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "data": (any_typ, ""),
                    },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    CATEGORY = "ImpactPack/Debug"

    OUTPUT_NODE = True

    RETURN_TYPES = ()
    FUNCTION = "doit"

    def doit(self, data, prompt, extra_pnginfo):
        shape = ""
        if hasattr(data, "shape"):
            shape = f"{data.shape} / "

        print(f"[IMPACT LOGGER]: {shape}{data}")

        print(f"         PROMPT: {prompt}")

        # for x in prompt:
        #     if 'inputs' in x and 'populated_text' in x['inputs']:
        #         print(f"PROMP: {x['10']['inputs']['populated_text']}")
        #
        # for x in extra_pnginfo['workflow']['nodes']:
        #     if x['type'] == 'ImpactWildcardProcessor':
        #         print(f" WV : {x['widgets_values'][1]}\n")

        return {}

```
