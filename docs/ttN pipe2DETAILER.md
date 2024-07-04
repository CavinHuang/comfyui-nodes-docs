
# Documentation
- Class name: ttN pipe2DETAILER
- Category: ttN/pipe
- Output node: False

ttN pipe2DETAILER节点旨在通过引入额外的特性和处理步骤来增强和细化给定的管道，包括边界框检测、可选的分割等细化功能，以提升输出质量。

# Input types
## Required
- pipe
    - 代表待增强和细化的管道，作为进一步处理的基础结构。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- bbox_detector
    - 指定用于识别管道输出中感兴趣区域的边界框检测器。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: Callable
- wildcard
    - 一个灵活的输入，用于额外的规格或配置，允许对细化过程进行自定义调整。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- sam_model_opt
    - 可选的语义分割模型，通过分割掩码提供额外的细节。
    - Comfy dtype: SAM_MODEL
    - Python dtype: Optional[Callable]
- segm_detector_opt
    - 可选的分割检测器，用于通过分割细节进一步细化输出。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: Optional[Callable]
- detailer_hook
    - 用于自定义细化功能的钩子，使细化过程能够进一步定制。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: Optional[Callable]

# Output types
- detailer_pipe
    - 输入管道的增强和细化版本，包含了额外的特性和处理步骤。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[Optional[Any], ...]
- pipe
    - 原始输入管道，返回用于参考或进一步处理。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipe_2DETAILER:
    version = '1.2.0'
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"pipe": ("PIPE_LINE",),
                             "bbox_detector": ("BBOX_DETECTOR", ), 
                             "wildcard": ("STRING", {"multiline": True, "placeholder": "wildcard spec: if kept empty, this option will be ignored"}),
                            },
                "optional": {"sam_model_opt": ("SAM_MODEL", ), 
                             "segm_detector_opt": ("SEGM_DETECTOR",),
                             "detailer_hook": ("DETAILER_HOOK",),
                            },
                "hidden": {"ttNnodeVersion": ttN_pipe_2DETAILER.version},
                }

    RETURN_TYPES = ("DETAILER_PIPE", "PIPE_LINE" )
    RETURN_NAMES = ("detailer_pipe", "pipe")
    FUNCTION = "flush"

    CATEGORY = "ttN/pipe"

    def flush(self, pipe, bbox_detector, wildcard, sam_model_opt=None, segm_detector_opt=None, detailer_hook=None):
        detailer_pipe = (pipe.get('model'), pipe.get('clip'), pipe.get('vae'), pipe.get('positive'), pipe.get('negative'), wildcard,
                         bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, None, None, None, None)
        return (detailer_pipe, pipe, )

```
