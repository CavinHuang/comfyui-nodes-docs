# Documentation
- Class name: WAS_SAM_Parameters
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_SAM_Parameters节点旨在为WAS套件中图像掩蔽操作处理和格式化输入数据。它接受点和标签以生成对后续掩蔽过程至关重要的参数。该节点在准备准确高效图像分割任务的基础工作中发挥关键作用。

# Input types
## Required
- points
    - “points”参数对于定义图像中用于掩蔽的坐标至关重要。它是一个字符串，包含一系列点，每个点由其x和y坐标表示。此参数通过确定图像中需要关注的区域，直接影响掩蔽过程的准确性。
    - Comfy dtype: STRING
    - Python dtype: str
- labels
    - “labels”参数为提供的点分配分类标签，这对于在掩蔽操作中区分图像中不同类型的区域至关重要。它是一个包含与每个点相对应的标签列表的字符串。此参数对于在掩蔽过程中对图像段进行分类和组织至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- parameters
    - “parameters”输出是输入点和标签的结构化表示，格式化为与图像掩蔽过程的要求兼容的字典。它封装了处理后的数据，使其准备好用于下游掩蔽操作。
    - Comfy dtype: SAM_PARAMETERS
    - Python dtype: Dict[str, Union[np.ndarray, List[int]]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_SAM_Parameters:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'points': ('STRING', {'default': '[128, 128]; [0, 0]', 'multiline': False}), 'labels': ('STRING', {'default': '[1, 0]', 'multiline': False})}}
    RETURN_TYPES = ('SAM_PARAMETERS',)
    FUNCTION = 'sam_parameters'
    CATEGORY = 'WAS Suite/Image/Masking'

    def sam_parameters(self, points, labels):
        parameters = {'points': np.asarray(np.matrix(points)), 'labels': np.array(np.matrix(labels))[0]}
        return (parameters,)
```