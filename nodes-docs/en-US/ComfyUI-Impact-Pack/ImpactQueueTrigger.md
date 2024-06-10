---
tags:
- ConditionalSelection
- ImpactPack
---

# Queue Trigger
## Documentation
- Class name: `ImpactQueueTrigger`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `True`

The ImpactQueueTrigger node is designed to conditionally trigger an action within a queue system based on a boolean mode. It serves as a control mechanism to either proceed with or halt the execution of subsequent tasks in the queue.
## Input types
### Required
- **`signal`**
    - A generic input signal that triggers the node's operation. Its primary role is to initiate the execution flow.
    - Comfy dtype: `*`
    - Python dtype: `any_typ`
- **`mode`**
    - A boolean flag determining whether to trigger the subsequent action in the queue. When set to True, the action is triggered; otherwise, it is skipped.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`signal_opt`**
    - Comfy dtype: `*`
    - The original input signal is passed through, allowing for the continuation of the execution flow.
    - Python dtype: `any_typ`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactQueueTrigger:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "signal": (any_typ,),
                    "mode": ("BOOLEAN", {"default": True, "label_on": "Trigger", "label_off": "Don't trigger"}),
                    }
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ("signal_opt",)
    OUTPUT_NODE = True

    def doit(self, signal, mode):
        if(mode):
            PromptServer.instance.send_sync("impact-add-queue", {})

        return (signal,)

```
