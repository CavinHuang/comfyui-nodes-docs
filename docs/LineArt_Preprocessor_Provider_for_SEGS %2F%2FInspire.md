# Documentation
- Class name: LineArt_Preprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点抽象地表示了通过应用风格化变换从输入图像生成线条艺术的过程，重点是增强边缘和轮廓，以创造更具艺术感的呈现。

# Input types
## Required
- coarse
    - 此参数控制线条艺术生成的细节级别，'启用'会导致更详细、更锐利的输出，而'禁用'则会产生较少细节的表示。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- SEGS_PREPROCESSOR
    - 输出是经过处理的线条艺术图像，根据输入参数进行了细化和风格化，准备用于进一步的分割任务。
    - Comfy dtype: NODE
    - Python dtype: LineArtPreprocessor

# Usage tips
- Infra type: GPU

# Source code
```
class LineArt_Preprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'coarse': ('BOOLEAN', {'default': False, 'label_on': 'enable', 'label_off': 'disable'})}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self, coarse):
        obj = LineArt_Preprocessor_wrapper(coarse)
        return (obj,)
```