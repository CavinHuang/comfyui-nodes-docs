# Documentation
- Class name: cleanGPUUsed
- Category: EasyUse/Logic
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点旨在通过管理GPU内存来优化计算资源。其主要功能是释放任何未被占用的GPU内存，以确保后续操作可以高效运行，而不会因内存不足而中断。

# Input types
## Required
- anything
    - 该参数虽然不直接影响节点的执行，但它是一个占位符，以确保与各种输入类型的兼容性。它不会影响节点的主要功能。
    - Comfy dtype: COMBO[AlwaysEqualProxy(str)]
    - Python dtype: Union[str, AlwaysEqualProxy]
## Optional
- unique_id
    - 这个参数虽然是可选的，但可以用来跟踪节点的执行。它可以帮助记录日志和调试过程。
    - Comfy dtype: str
    - Python dtype: Optional[str]
- extra_pnginfo
    - 这个可选参数可以存储与节点执行相关的额外信息。它对节点的操作不是关键的，但可能对进一步分析有用。
    - Comfy dtype: str
    - Python dtype: Optional[str]

# Output types

# Usage tips
- Infra type: GPU

# Source code
```
class cleanGPUUsed:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'anything': (AlwaysEqualProxy('*'), {})}, 'optional': {}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    RETURN_NAMES = ()
    OUTPUT_NODE = True
    FUNCTION = 'empty_cache'
    CATEGORY = 'EasyUse/Logic'

    def empty_cache(self, anything, unique_id=None, extra_pnginfo=None):
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
        return ()
```