---
tags:
- Cache
---

# VRAM Debug
## Documentation
- Class name: `VRAM_Debug`
- Category: `KJNodes/misc`
- Output node: `False`

The VRAM_Debug node is designed to monitor and manage video RAM (VRAM) usage within a computational environment. It provides functionalities to clear memory caches, unload all models from memory, and perform garbage collection to free up VRAM. This node is particularly useful for optimizing memory usage and preventing out-of-memory errors during intensive computational tasks.
## Input types
### Required
- **`empty_cache`**
    - Specifies whether to clear PyTorch's cache, potentially freeing up a significant amount of VRAM.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`gc_collect`**
    - Determines whether garbage collection is performed, helping to free up unused memory and optimize VRAM usage.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`unload_all_models`**
    - Indicates whether all models should be unloaded from memory, which can drastically reduce VRAM usage.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`any_input`**
    - Allows for any additional input to be passed through the node, offering flexibility in its application.
    - Comfy dtype: `*`
    - Python dtype: `object`
- **`image_pass`**
    - An optional image data that can be passed through the node without modification.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`model_pass`**
    - An optional model data that can be passed through the node without modification.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
## Output types
- **`any_output`**
    - Comfy dtype: `*`
    - Returns any additional input passed to the node, allowing for flexible data flow.
    - Python dtype: `object`
- **`image_pass`**
    - Comfy dtype: `IMAGE`
    - Returns the optional image data passed through the node without modification.
    - Python dtype: `torch.Tensor`
- **`model_pass`**
    - Comfy dtype: `MODEL`
    - Returns the optional model data passed through the node without modification.
    - Python dtype: `object`
- **`freemem_before`**
    - Comfy dtype: `INT`
    - Provides the amount of free VRAM before the node's operations were executed.
    - Python dtype: `int`
- **`freemem_after`**
    - Comfy dtype: `INT`
    - Provides the amount of free VRAM after the node's operations, highlighting the effectiveness of memory management.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VRAM_Debug:
    
    @classmethod
    
    def INPUT_TYPES(s):
      return {
        "required": {
            
            "empty_cache": ("BOOLEAN", {"default": True}),
            "gc_collect": ("BOOLEAN", {"default": True}),
            "unload_all_models": ("BOOLEAN", {"default": False}),
        },
        "optional": {
            "any_input": (any, {}),
            "image_pass": ("IMAGE",),
            "model_pass": ("MODEL",),
        }
	}
        
    RETURN_TYPES = (any, "IMAGE","MODEL","INT", "INT",)
    RETURN_NAMES = ("any_output", "image_pass", "model_pass", "freemem_before", "freemem_after")
    FUNCTION = "VRAMdebug"
    CATEGORY = "KJNodes/misc"
    DESCRIPTION = """
Returns the inputs unchanged, they are only used as triggers,  
and performs comfy model management functions and garbage collection,  
reports free VRAM before and after the operations.
"""

    def VRAMdebug(self, gc_collect,empty_cache, unload_all_models, image_pass=None, model_pass=None, any_input=None):
        freemem_before = model_management.get_free_memory()
        print("VRAMdebug: free memory before: ", freemem_before)
        if empty_cache:
            model_management.soft_empty_cache()
        if unload_all_models:
            model_management.unload_all_models()
        if gc_collect:
            import gc
            gc.collect()
        freemem_after = model_management.get_free_memory()
        print("VRAMdebug: free memory after: ", freemem_after)
        print("VRAMdebug: freed memory: ", freemem_after - freemem_before)
        return (any_input, image_pass, model_pass, freemem_before, freemem_after)

```
