# Documentation
- Class name: SeargeFreeU
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点有助于配置和管理旨在无搜索环境下运行的系统的参数，提供了一种定义操作模式和设置的简化方法。

# Input types
## Required
- freeu_mode
    - 决定系统的运行模式，这对于根据特定要求调整系统的行为和性能至关重要。
    - Comfy dtype: COMBO[FREEU_MODES]
    - Python dtype: Enum
- b1
    - 影响参数的初始设置，这对于建立系统运行的基础条件至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b2
    - 影响与主要设置一起工作的次要设置，以完善系统的操作参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s1
    - 修改控制系统敏感性的参数，调整其对输入数据的响应，确保最佳的交互。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s2
    - 调整另一个参数，微调系统的运行，专注于提高其适应性和精确性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- freeu_version
    - 指定正在使用的系统的版本，这对于确保兼容性和功能可用性很重要。
    - Comfy dtype: FREEU_VERSION
    - Python dtype: Enum

# Output types
- data
    - 包含用于设置和指导系统运行的结构化配置数据。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeFreeU:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'freeu_mode': (UI.FREEU_MODES,), 'b1': ('FLOAT', {'default': 1.3, 'min': 1.0, 'max': 1.4, 'step': 0.01}), 'b2': ('FLOAT', {'default': 1.4, 'min': 1.2, 'max': 1.6, 'step': 0.01}), 's1': ('FLOAT', {'default': 0.9, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 's2': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'freeu_version': (UI.FREEU_VERSION,)}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(freeu_mode, b1, b2, s1, s2, freeu_version):
        return {UI.F_FREEU_MODE: freeu_mode, UI.F_FREEU_B1: b1, UI.F_FREEU_B2: b2, UI.F_FREEU_S1: s1, UI.F_FREEU_S2: s2, UI.F_FREEU_VERSION: freeu_version}

    def get(self, freeu_mode, b1, b2, s1, s2, freeu_version, data=None):
        if data is None:
            data = {}
        data[UI.S_FREEU] = self.create_dict(freeu_mode, b1, b2, s1, s2, freeu_version)
        return (data,)
```