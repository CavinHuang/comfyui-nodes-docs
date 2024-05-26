# Documentation
- Class name: TilePreprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

TilePreprocessor_Provider_for_SEGS 类旨在通过预处理输入图像来提高图像分割任务的准确性。它采用金字塔上采样方法来细化图像细节，确保分割模型接收到最优化的数据处理。该节点通过确保分割过程尽可能有效和精确，从而对整体工作流程做出贡献。

# Input types
## Required
- pyrUp_iters
    - ‘pyrUp_iters’参数对于控制金字塔上采样过程中使用的迭代次数至关重要。它直接影响预处理图像的细节和分辨率水平，进而影响分割输出的质量。适当调整此参数可以显著提高分割结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- SEGS_PREPROCESSOR
    - TilePreprocessor_Provider_for_SEGS 节点的输出是为分割任务优化的预处理图像。该输出作为后续分割模型的输入，确保它们接收到最可能准确的数据，以获得可靠和准确的结果。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: PIL.Image or numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class TilePreprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pyrUp_iters': ('INT', {'default': 3, 'min': 1, 'max': 10, 'step': 1})}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self, pyrUp_iters):
        obj = TilePreprocessor_wrapper(pyrUp_iters)
        return (obj,)
```