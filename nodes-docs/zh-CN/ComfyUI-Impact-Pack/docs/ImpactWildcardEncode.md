# Documentation
- Class name: ImpactWildcardEncode
- Category: ImpactPack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

“ImpactWildcardEncode”节点旨在将文本数据与模型和剪辑进行整合和操作。它专门处理包含通配符的文本，并利用LoRA等高级技术进行文本修改。此节点对于动态文本生成和模型调节至关重要的应用场景是核心所在。

# Input types
## Required
- model
    - “model”参数对于节点的操作至关重要，因为它定义了将用于文本处理的模型。这是一个基本组件，直接影响节点生成和操作文本数据的能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - “clip”参数是必需的，因为它代表将与文本一起处理的多媒体剪辑。它在节点如何整合文本和多媒体内容中扮演着重要角色。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- wildcard_text
    - “wildcard_text”参数允许在文本中包含占位符，这些占位符可以根据上下文动态填充。对于需要灵活文本输入的应用来说，这是一个关键特性。
    - Comfy dtype: STRING
    - Python dtype: str
- populated_text
    - “populated_text”参数是待处理的实际文本所在的位置。它很重要，因为它是文本操作的主要输入，直接影响输出。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- mode
    - “mode”参数决定文本将被填充还是保持固定。这是一个重要的开关，它根据期望的结果改变节点的行为。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- Select to add LoRA
    - “Select to add LoRA”参数允许向文本中添加LoRA，这可以显著增强文本在模型上下文中的表现力和适应性。
    - Comfy dtype: COMBO[Select the LoRA to add to the text]
    - Python dtype: str
- Select to add Wildcard
    - “Select to add Wildcard”参数用于向文本中引入通配符，提供了一种动态文本插入和修改的机制。
    - Comfy dtype: COMBO[Select the Wildcard to add to the text]
    - Python dtype: str
- seed
    - “seed”参数对于确保节点操作的可重复性很重要，特别是在处理随机过程时。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - “model”输出代表处理文本和剪辑后的更新模型，可供进一步使用或分析。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - “clip”输出是已与文本数据集成的已处理多媒体剪辑。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- conditioning
    - “conditioning”输出提供了从文本和剪辑派生的上下文信息，可用于指导进一步的模型操作。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- populated_text
    - “populated_text”输出是所有处理步骤之后的最终文本，反映了节点执行期间所做的动态更改。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactWildcardEncode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'wildcard_text': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'populated_text': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'Populate', 'label_off': 'Fixed'}), 'Select to add LoRA': (['Select the LoRA to add to the text'] + folder_paths.get_filename_list('loras'),), 'Select to add Wildcard': (['Select the Wildcard to add to the text'],), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    CATEGORY = 'ImpactPack/Prompt'
    RETURN_TYPES = ('MODEL', 'CLIP', 'CONDITIONING', 'STRING')
    RETURN_NAMES = ('model', 'clip', 'conditioning', 'populated_text')
    FUNCTION = 'doit'

    @staticmethod
    def process_with_loras(**kwargs):
        return impact.wildcards.process_with_loras(**kwargs)

    @staticmethod
    def get_wildcard_list():
        return impact.wildcards.get_wildcard_list()

    def doit(self, *args, **kwargs):
        populated = kwargs['populated_text']
        (model, clip, conditioning) = impact.wildcards.process_with_loras(populated, kwargs['model'], kwargs['clip'])
        return (model, clip, conditioning, populated)
```