---
tags:
- Latent
---

# 🪛 Stats system (powered by WAS)
## Documentation
- Class name: `Stats system [Crystools]`
- Category: `crystools 🪛/Utils`
- Output node: `False`

This node is designed to gather and log system statistics, providing insights into the current state of the system's hardware resources such as CPU usage, RAM utilization, and more. It serves as a diagnostic tool to monitor and debug system performance.
## Input types
### Required
- **`latent`**
    - The 'latent' input acts as a pass-through parameter, allowing the node to return it unchanged alongside the system statistics. This feature is useful for integrating system monitoring without disrupting data flow in a pipeline.
    - Comfy dtype: `LATENT`
    - Python dtype: `tuple`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The 'latent' output parameter returns the original 'latent' input, allowing the node to be seamlessly integrated into a data processing pipeline without altering the flow of data.
    - Python dtype: `tuple`
- **`ui`**
    - The 'ui' output parameter provides a user interface element displaying the logged system statistics, offering a convenient way to visualize the system's current state.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CUtilsStatSystem:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent": ("LATENT",),
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.UTILS.value
    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent",)

    FUNCTION = "execute"

    def execute(self, latent):
        log = "Samples Passthrough:\n"
        for stat in get_system_stats():
            log += stat + "\n"

        logger.debug(log)

        return {"ui": {"text": [log]}, "result": (latent,)}

```
