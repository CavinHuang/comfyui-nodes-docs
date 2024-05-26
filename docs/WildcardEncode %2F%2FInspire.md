# Documentation
- Class name: WildcardEncodeInspire
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

WildcardEncodeInspire节点旨在处理和编码带有通配符和LoRa（低秩适应）块的文本输入，将它们整合到模型和clip条件中，用于稳定扩散。它通过基于用户输入或固定文本动态生成提示来填充通配符，增强输出内容的创造性和适应性。对于寻求利用先进的文本编码技术来提高AI生成内容质量和相关性的用户来说，此节点是必不可少的。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了将用于文本编码和处理的基础AI模型。它直接影响生成内容的质量和特性，确保输出与指定模型的能力和训练数据保持一致。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数对于将文本与视觉上下文整合至关重要，使节点能够生成不仅在文本上连贯而且视觉上相关的提示。它在确保AI输出与期望的视觉元素保持一致方面发挥着重要作用。
    - Comfy dtype: CLIP
    - Python dtype: CLIPModel
- token_normalization
    - token_normalization参数对于在编码之前对文本标记进行预处理非常重要。它标准化了标记值，这可以提高文本编码过程的效率和准确性，确保AI模型能够更好地理解和处理输入文本。
    - Comfy dtype: COMBO
    - Python dtype: str
- weight_interpretation
    - weight_interpretation参数在确定节点如何在编码过程中解释和应用权重方面起着关键作用。它影响对文本不同部分的强调，这可以显著影响最终输出的重点和细节。
    - Comfy dtype: COMBO
    - Python dtype: str
- wildcard_text
    - wildcard_text参数是节点功能的核心，因为它包含了将在编码过程中被填充或替换的带有通配符的模板。它是生成动态和适应性强的提示的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- populated_text
    - populated_text参数保存了处理通配符后的最终文本，用于实际的编码和生成AI内容。它是节点主要功能的结果，直接影响输出。
    - Comfy dtype: STRING
    - Python dtype: str
- mode
    - mode参数控制节点是否基于用户输入生成动态提示（Populate）还是使用固定文本（Fixed）。此设置对于确定生成提示的灵活性和适应性至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - seed参数用于在编码过程中引入随机性，允许生成多样化和独特的输出。它确保即使输入相同，也可以产生不同的结果，增加了AI输出的变异性。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- Select to add LoRA
    - '选择添加LoRA'参数允许用户将特定的LoRa块纳入文本中，通过额外的上下文信息增强编码过程。这可以显著提高AI生成内容的相关性和深度。
    - Comfy dtype: COMBO
    - Python dtype: str
- Select to add Wildcard
    - 此参数允许用户向文本中添加特定的通配符，这些通配符可以在编码过程中动态填充或替换。这是定制输出以满足特定创意或主题要求的关键方面。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- model
    - 模型输出是带有编码文本和条件的更新后的AI模型，准备根据输入和处理参数生成内容。它代表了节点编码工作的成果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip输出整合了输入的视觉上下文，增强了AI生成不仅在文本上连贯而且与提供的clip视觉对齐的内容的能力。
    - Comfy dtype: CLIP
    - Python dtype: CLIPModel
- conditioning
    - 条件输出为AI模型提供了额外的上下文和指导，确保生成的内容符合指定的主题和要求。它是实现针对性和相关性AI输出的关键组成部分。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- populated_text
    - populated_text输出是经过处理的最终文本，其中的通配符已被填充或替换，准备用于AI模型的生成过程中。它是节点编码和处理活动的直接结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class WildcardEncodeInspire:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'token_normalization': (['none', 'mean', 'length', 'length+mean'],), 'weight_interpretation': (['comfy', 'A1111', 'compel', 'comfy++', 'down_weight'], {'default': 'comfy++'}), 'wildcard_text': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'placeholder': 'Wildcard Prompt (User Input)'}), 'populated_text': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'placeholder': 'Populated Prompt (Will be generated automatically)'}), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'Populate', 'label_off': 'Fixed'}), 'Select to add LoRA': (['Select the LoRA to add to the text'] + folder_paths.get_filename_list('loras'),), 'Select to add Wildcard': (['Select the Wildcard to add to the text'],), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    CATEGORY = 'InspirePack/Prompt'
    RETURN_TYPES = ('MODEL', 'CLIP', 'CONDITIONING', 'STRING')
    RETURN_NAMES = ('model', 'clip', 'conditioning', 'populated_text')
    FUNCTION = 'doit'

    def doit(self, *args, **kwargs):
        populated = kwargs['populated_text']
        clip_encoder = BNK_EncoderWrapper(kwargs['token_normalization'], kwargs['weight_interpretation'])
        if 'ImpactWildcardEncode' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/ltdrdata/ComfyUI-Impact-Pack', "To use 'Wildcard Encode (Inspire)' node, 'Impact Pack' extension is required.")
            raise Exception(f"[ERROR] To use 'Wildcard Encode (Inspire)', you need to install 'Impact Pack'")
        (model, clip, conditioning) = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode'].process_with_loras(wildcard_opt=populated, model=kwargs['model'], clip=kwargs['clip'], clip_encoder=clip_encoder)
        return (model, clip, conditioning, populated)
```