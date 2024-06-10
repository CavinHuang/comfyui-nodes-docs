# Documentation
- Class name: WAS_SAM_Combine_Parameters
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法`sam_combine_parameters`旨在合并两组与SAM（Semantic Affinity Model）相关的参数。它的作用是将多个参数集整合成统一的结构，这对于需要将不同SAM实例的数据进行整合的操作至关重要。该节点在确保点和标签的无缝整合中发挥关键作用，促进WAS套件中复杂的图像和掩蔽任务的执行。

# Input types
## Required
- sam_parameters_a
    - 第一组SAM参数对于组合过程至关重要。它包含了将与另一组合并的初始数据点和标签。此参数显著影响最终组合参数的结构和内容，影响图像和掩蔽工作流程中的后续步骤。
    - Comfy dtype: SAM_PARAMETERS
    - Python dtype: Dict[str, Union[np.ndarray, List[str]]]
- sam_parameters_b
    - 将与第一组参数结合的第二组SAM参数。它与第一组参数同样重要，提供额外的数据点和标签，有助于组合参数的全面性。
    - Comfy dtype: SAM_PARAMETERS
    - Python dtype: Dict[str, Union[np.ndarray, List[str]]]

# Output types
- parameters
    - `sam_combine_parameters`方法的输出是一组统一的参数，它包含了来自两个输入SAM参数的组合数据。这个输出很重要，因为它是图像和掩蔽领域进一步处理和分析的基础。
    - Comfy dtype: SAM_PARAMETERS
    - Python dtype: Dict[str, Union[np.ndarray, List[str]]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_SAM_Combine_Parameters:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'sam_parameters_a': ('SAM_PARAMETERS',), 'sam_parameters_b': ('SAM_PARAMETERS',)}}
    RETURN_TYPES = ('SAM_PARAMETERS',)
    FUNCTION = 'sam_combine_parameters'
    CATEGORY = 'WAS Suite/Image/Masking'

    def sam_combine_parameters(self, sam_parameters_a, sam_parameters_b):
        parameters = {'points': np.concatenate((sam_parameters_a['points'], sam_parameters_b['points']), axis=0), 'labels': np.concatenate((sam_parameters_a['labels'], sam_parameters_b['labels']))}
        return (parameters,)
```