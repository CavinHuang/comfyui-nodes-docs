
# Documentation
- Class name: `VRAM_Debug`
- Category: `KJNodes/misc`
- Output node: `False`

VRAM_Debug节点旨在监控和管理计算环境中的视频内存(VRAM)使用情况。它提供了清除内存缓存、从内存中卸载所有模型以及执行垃圾回收以释放VRAM的功能。这个节点对于优化内存使用和防止在密集计算任务中出现内存不足错误特别有用。

# Input types
## Required
- **`empty_cache`**
    - 指定是否清除PyTorch的缓存，可能会释放大量VRAM。
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`gc_collect`**
    - 决定是否执行垃圾回收，有助于释放未使用的内存并优化VRAM使用。
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`unload_all_models`**
    - 指示是否应从内存中卸载所有模型，这可以大幅减少VRAM使用。
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Optional
- **`any_input`**
    - 允许通过节点传递任何额外输入，提供了应用的灵活性。
    - Comfy dtype: `*`
    - Python dtype: `object`
- **`image_pass`**
    - 可选的图像数据，可以不经修改地通过节点传递。
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`model_pass`**
    - 可选的模型数据，可以不经修改地通过节点传递。
    - Comfy dtype: `MODEL`
    - Python dtype: `object`

# Output types
- **`any_output`**
    - Comfy dtype: `*`
    - 返回传递给节点的任何额外输入，允许灵活的数据流。
    - Python dtype: `object`
- **`image_pass`**
    - Comfy dtype: `IMAGE`
    - 返回不经修改地通过节点传递的可选图像数据。
    - Python dtype: `torch.Tensor`
- **`model_pass`**
    - Comfy dtype: `MODEL`
    - 返回不经修改地通过节点传递的可选模型数据。
    - Python dtype: `object`
- **`freemem_before`**
    - Comfy dtype: `INT`
    - 提供执行节点操作前的可用VRAM量。
    - Python dtype: `int`
- **`freemem_after`**
    - Comfy dtype: `INT`
    - 提供执行节点操作后的可用VRAM量，突显了内存管理的有效性。
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
