---
tags:
- ConditionalSelection
- ImpactPack
---

# Queue Trigger (Countdown)
## Documentation
- Class name: `ImpactQueueTriggerCountdown`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `True`

This node is designed to manage a countdown mechanism within a queue system, triggering specific actions based on the countdown progress and conditional logic. It effectively integrates with external systems to update and control the flow of operations based on the countdown state.
## Input types
### Required
- **`count`**
    - Represents the current count in the countdown process, affecting the node's decision to trigger the next step or reset.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`total`**
    - Defines the total count for the countdown, determining when the countdown should reset.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mode`**
    - A boolean flag that controls whether the countdown mechanism is active, influencing the node's behavior in triggering or not triggering actions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`signal`**
    - An optional input that can carry additional information or control signals through the node's operation.
    - Comfy dtype: `*`
    - Python dtype: `object`
## Output types
- **`signal_opt`**
    - Comfy dtype: `*`
    - Optionally returns the input signal, allowing for conditional data flow through the node.
    - Python dtype: `object`
- **`count`**
    - Comfy dtype: `INT`
    - Returns the updated count after the node's operation, reflecting the countdown's progress.
    - Python dtype: `int`
- **`total`**
    - Comfy dtype: `INT`
    - Returns the total count value, unchanged from the input, to maintain consistency in the data flow.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactQueueTriggerCountdown:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "count": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "total": ("INT", {"default": 10, "min": 1, "max": 0xffffffffffffffff}),
                    "mode": ("BOOLEAN", {"default": True, "label_on": "Trigger", "label_off": "Don't trigger"}),
                    },
                "optional": {"signal": (any_typ,),},
                "hidden": {"unique_id": "UNIQUE_ID"}
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"
    RETURN_TYPES = (any_typ, "INT", "INT")
    RETURN_NAMES = ("signal_opt", "count", "total")
    OUTPUT_NODE = True

    def doit(self, count, total, mode, unique_id, signal=None):
        if (mode):
            if count < total - 1:
                PromptServer.instance.send_sync("impact-node-feedback",
                                                {"node_id": unique_id, "widget_name": "count", "type": "int", "value": count+1})
                PromptServer.instance.send_sync("impact-add-queue", {})
            if count >= total - 1:
                PromptServer.instance.send_sync("impact-node-feedback",
                                                {"node_id": unique_id, "widget_name": "count", "type": "int", "value": 0})

        return (signal, count, total)

```
