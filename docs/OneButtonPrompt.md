# Documentation
- Class name: OneButtonPrompt
- Category: OneButtonPrompt
- Output node: False
- Repo Ref: https://github.com/AIrjen/OneButtonPrompt

该节点旨在根据各种输入参数生成动态提示，旨在为内容创作产生多样化和引人入胜的输出。它结合了主题、艺术风格和环境背景等元素，以产生具有内聚性和丰富主题的提示。

# Input types
## Required
- insanitylevel
    - 该参数决定了生成提示的复杂性和精细度，更高级别将导致更详细和微妙的输出。它直接影响提示中包含的元素的多样性和深度。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- artist
    - 艺术家参数允许指定特定的艺术风格或创作者，指导生成提示的审美和主题方向。
    - Comfy dtype: COMBO
    - Python dtype: str
- imagetype
    - 该参数设置了期望的图像或视觉表现形式的类型，影响生成内容的媒介、风格和整体视觉方法。
    - Comfy dtype: COMBO
    - Python dtype: str
- subject
    - 主题参数在确定生成提示的主要焦点或主题方面至关重要，影响叙事、人物和设定元素。
    - Comfy dtype: COMBO
    - Python dtype: str
- imagemodechance
    - 该参数调整了在提示中包含某些图像模式的可能性，从而影响视觉方面的多样性和创造性。
    - Comfy dtype: INT
    - Python dtype: int
- custom_subject
    - 自定义主题参数允许输入用户希望关注的具体主题，确保生成的提示针对他们的兴趣进行定制。
    - Comfy dtype: STRING
    - Python dtype: str
- custom_outfit
    - 该参数使用户能够为主题指定特定的服装或服饰，为生成的提示增添个性化的触感。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- prompt
    - 输出是一个综合性和创造性构建的提示，涵盖了输入参数，为内容创作提供了丰富的基础。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class OneButtonPrompt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'insanitylevel': ('INT', {'default': 5, 'min': 1, 'max': 10, 'step': 1})}, 'optional': {'artist': (artists, {'default': 'all'}), 'imagetype': (imagetypes, {'default': 'all'}), 'imagemodechance': ('INT', {'default': 20, 'min': 1, 'max': 100, 'step': 1}), 'subject': (subjects, {'default': 'all'}), 'custom_subject': ('STRING', {'multiline': False, 'default': ''}), 'custom_outfit': ('STRING', {'multiline': False, 'default': ''}), 'subject_subtype_objects': (subjectsubtypesobject, {'default': 'all'}), 'subject_subtypes_humanoids': (subjectsubtypeshumanoid, {'default': 'all'}), 'humanoids_gender': (genders, {'default': 'all'}), 'subject_subtypes_concepts': (subjectsubtypesconcept, {'default': 'all'}), 'emojis': (emojis, {'default': False}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('prompt', 'prompt_g', 'prompt_l')
    FUNCTION = 'Comfy_OBP'
    CATEGORY = 'OneButtonPrompt'

    def Comfy_OBP(self, insanitylevel, custom_subject, seed, artist, imagetype, subject, imagemodechance, humanoids_gender, subject_subtype_objects, subject_subtypes_humanoids, subject_subtypes_concepts, emojis, custom_outfit):
        generatedpromptlist = build_dynamic_prompt(insanitylevel, subject, artist, imagetype, False, '', '', '', 1, '', custom_subject, True, '', imagemodechance, humanoids_gender, subject_subtype_objects, subject_subtypes_humanoids, subject_subtypes_concepts, False, emojis, seed, custom_outfit, True)
        generatedprompt = generatedpromptlist[0]
        prompt_g = generatedpromptlist[1]
        prompt_l = generatedpromptlist[2]
        return (generatedprompt, prompt_g, prompt_l)
```