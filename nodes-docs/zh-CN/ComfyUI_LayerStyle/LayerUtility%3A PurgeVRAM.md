# Documentation
- Class name: PurgeVRAM
- Category: 😺dzNodes/LayerUtility/SystemIO
- Output node: True
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

清理GPU显存。可以接入任意类型的输入，当执行到这个节点时将清理VRAM以及RAM中的垃圾对象。通常放置在推理任务完成的节点之后，例如VAE Decode节点。

# Input types

## Required

- anything
    - 任意输入。
    - Comfy dtype: any
    - Python dtype: any

- purge_cache
    - 清除缓存。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- purge_models
    - 清除模型。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

## Optional

- 无

# Output types

- 无

# Usage tips
- Infra type: CPU

# Source code
```python
class PurgeVRAM:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "anything": (any, {}),
                "purge_cache": ("BOOLEAN", {"default": True}),
                "purge_models": ("BOOLEAN", {"default": True}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "purge_vram"
    CATEGORY = '😺dzNodes/LayerUtility/SystemIO'
    OUTPUT_NODE = True

    def purge_vram(self, anything, purge_cache, purge_models):
        import torch.cuda
        import gc
        import comfy.model_management
        if purge_cache:
            if torch.cuda.is_available():
                gc.collect()
                torch.cuda.empty_cache()
                torch.cuda.ipc_collect()
        if purge_models:
            comfy.model_management.unload_all_models()

        return (None,)