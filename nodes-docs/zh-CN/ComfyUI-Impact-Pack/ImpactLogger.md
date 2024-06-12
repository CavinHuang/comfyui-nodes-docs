# Documentation
- Class name: ImpactLogger
- Category: ImpactPack/Debug
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactLogger节点旨在提供日志记录功能，用于捕获和输出正在处理的数据信息。它特别适用于调试目的，允许开发人员在工作流程的不同阶段检查数据的形状和内容。

# Input types
## Required
- data
    - ‘data’参数对于日志记录过程至关重要，因为它代表了ImpactLogger节点设计用来记录的核心数据。正是通过这个参数，节点捕获并打印数据的形状和内容以供调试。
    - Comfy dtype: any_typ
    - Python dtype: Any
## Optional
- prompt
    - ‘prompt’参数作为一个可选的描述符，可以用来为正在记录的数据提供额外的上下文或特定的标识符。当跟踪多个数据点或日志输出用于进一步分析时，这可能特别有用。
    - Comfy dtype: str
    - Python dtype: str
- extra_pnginfo
    - ‘extra_pnginfo’参数允许包含对日志记录过程可能相关的额外信息。这可能包括元数据或任何其他与正在记录的核心‘data’不直接相关但对调试过程仍具有重要意义的辅助细节。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- output
    - ImpactLogger节点的‘output’是一个空字典，表明节点的主要功能是记录信息，而不是产生将传递给后续节点的重要输出。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactLogger:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'data': (any_typ, '')}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    CATEGORY = 'ImpactPack/Debug'
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = 'doit'

    def doit(self, data, prompt, extra_pnginfo):
        shape = ''
        if hasattr(data, 'shape'):
            shape = f'{data.shape} / '
        print(f'[IMPACT LOGGER]: {shape}{data}')
        print(f'         PROMPT: {prompt}')
        return {}
```