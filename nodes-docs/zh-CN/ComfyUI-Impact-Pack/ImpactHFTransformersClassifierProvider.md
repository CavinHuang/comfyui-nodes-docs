# Documentation
- Class name: HF_TransformersClassifierProvider
- Category: ImpactPack/HuggingFace
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

HF_TransformersClassifierProvider节点旨在使用Hugging Face Transformers库中的模型来促进创建和使用文本分类器。它抽象了模型选择和设备分配的复杂性，使用户能够专注于手头的分类任务。节点的主要功能是简化获取分类器的过程，该分类器可以立即应用于给定的文本数据集。

# Input types
## Required
- preset_repo_id
    - preset_repo_id参数对于从Hugging Face模型中心识别预配置的模型存储库至关重要。它通过提供一组预定义的选项来简化模型选择过程。此参数在确定分类器将基于的基础模型中起着关键作用，因此直接影响分类性能。
    - Comfy dtype: STRING
    - Python dtype: Union[str, List[str]]
- device_mode
    - device_mode参数决定了用于模型推理的计算设备。它提供自动选择设备、如果可用则优先选择GPU，或明确选择CPU的选项。这个参数很重要，因为它可以影响分类过程的速度和效率，特别是对于大型模型或数据集。
    - Comfy dtype: STRING
    - Python dtype: Literal['AUTO', 'Prefer GPU', 'CPU']
## Optional
- manual_repo_id
    - 当preset_repo_id设置为'Manual repo id'时，manual_repo_id参数允许指定自定义模型存储库ID。这为希望使用预定义选项之外的模型的用户提供了灵活性，使节点能够适应更广泛的分类任务。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- TRANSFORMERS_CLASSIFIER
    - TRANSFORMERS_CLASSIFIER输出提供了一个来自Hugging Face Transformers库的预训练模型，用于文本分类任务。它封装了模型的推理能力，允许无缝集成到下游应用中。
    - Comfy dtype: TRANSFORMERS_CLASSIFIER
    - Python dtype: Any

# Usage tips
- Infra type: GPU

# Source code
```
class HF_TransformersClassifierProvider:

    @classmethod
    def INPUT_TYPES(s):
        global hf_transformer_model_urls
        return {'required': {'preset_repo_id': (hf_transformer_model_urls + ['Manual repo id'],), 'manual_repo_id': ('STRING', {'multiline': False}), 'device_mode': (['AUTO', 'Prefer GPU', 'CPU'],)}}
    RETURN_TYPES = ('TRANSFORMERS_CLASSIFIER',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/HuggingFace'

    def doit(self, preset_repo_id, manual_repo_id, device_mode):
        from transformers import pipeline
        if preset_repo_id == 'Manual repo id':
            url = manual_repo_id
        else:
            url = preset_repo_id
        if device_mode != 'CPU':
            device = comfy.model_management.get_torch_device()
        else:
            device = 'cpu'
        classifier = pipeline(model=url, device=device)
        return (classifier,)
```