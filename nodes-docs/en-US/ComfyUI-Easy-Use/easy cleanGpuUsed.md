---
tags:
- Cache
---

# Clean GPU Used
## Documentation
- Class name: `easy cleanGpuUsed`
- Category: `EasyUse/Logic`
- Output node: `True`

The `easy cleanGpuUsed` node is designed to free up GPU resources by clearing the GPU cache and unloading all models currently loaded in memory. This operation is crucial for managing memory usage and ensuring efficient GPU utilization, especially in environments where multiple models or heavy computations are run sequentially.
## Input types
### Required
- **`anything`**
    - This parameter acts as a placeholder, allowing the node to be called without specific input requirements. It does not affect the execution of the node.
    - Comfy dtype: `*`
    - Python dtype: `Any`
### Optional
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class cleanGPUUsed:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"anything": (AlwaysEqualProxy("*"), {})}, "optional": {},
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO",
                           }}

    RETURN_TYPES = ()
    RETURN_NAMES = ()
    OUTPUT_NODE = True
    FUNCTION = "empty_cache"
    CATEGORY = "EasyUse/Logic"

    def empty_cache(self, anything, unique_id=None, extra_pnginfo=None):
        cleanGPUUsedForce()
        return ()

```
