# Documentation
- Class name: stylesPromptSelector
- Category: EasyUse/Prompt
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点抽象地管理风格化提示的选择和应用，以指导生成过程，确保主题一致性和风格多样性，而不涉及具体的实现细节。

# Input types
## Required
- styles
    - “样式”参数至关重要，因为它决定了输出的风格方向。它允许节点从预定义的样式集中进行选择，从而影响生成内容的整体美学和主题结果。
    - Comfy dtype: COMBO[fooocus_styles, bar_styles, baz_styles]
    - Python dtype: Union[str, List[str]]
## Optional
- positive
    - “正面”参数作为指导，让节点在输出中包含某些元素或主题。它通过专注于期望的方面来完善生成过程，提高最终结果的相关性和吸引力。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]
- negative
    - “负面”参数在定义应从输出中排除的内容方面至关重要。它帮助节点避免不希望的元素或主题，确保最终结果与预期的愿景保持一致。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]
- prompt
    - “提示”参数是一个隐藏输入，当存在于输入的“my_unique_id”部分时，为节点提供额外的上下文。它可以包含特定的指令或偏好，进一步根据用户的需求定制输出。
    - Comfy dtype: PROMPT
    - Python dtype: Dict[str, Any]
- extra_pnginfo
    - 当提供“额外_pnginfo”参数时，它可以提供补充信息，节点可以利用这些信息来提高输出的细节和质量。它在完善生成过程以满足特定用户需求方面发挥作用。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Any
- my_unique_id
    - “my_unique_id”参数是一个隐藏输入，用于唯一标识请求。它使节点能够管理和关联特定用户请求的输入，确保个性化和有针对性的输出生成。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: Any

# Output types
- positive
    - “正面”输出代表了根据输入标准定制和选择的风格化提示。它是最终输出的关键组成部分，确保生成的内容与期望的主题和元素保持一致。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - “负面”输出捕捉了从生成过程中明确排除的元素或主题。这确保了最终结果不受不希望的方面的干扰，严格遵循用户的规格要求。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class stylesPromptSelector:

    @classmethod
    def INPUT_TYPES(s):
        styles = ['fooocus_styles']
        styles_dir = FOOOCUS_STYLES_DIR
        for file_name in os.listdir(styles_dir):
            file = os.path.join(styles_dir, file_name)
            if os.path.isfile(file) and file_name.endswith('.json') and ('styles' in file_name.split('.')[0]):
                styles.append(file_name.split('.')[0])
        return {'required': {'styles': (styles, {'default': 'fooocus_styles'})}, 'optional': {'positive': ('STRING', {'forceInput': True}), 'negative': ('STRING', {'forceInput': True})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('positive', 'negative')
    CATEGORY = 'EasyUse/Prompt'
    FUNCTION = 'run'
    OUTPUT_NODE = True

    def replace_repeat(self, prompt):
        prompt = prompt.replace('，', ',')
        arr = prompt.split(',')
        if len(arr) != len(set(arr)):
            all_weight_prompt = re.findall(re.compile('[(](.*?)[)]', re.S), prompt)
            if len(all_weight_prompt) > 0:
                return prompt
            else:
                for i in range(len(arr)):
                    arr[i] = arr[i].strip()
                arr = list(set(arr))
                return ', '.join(arr)
        else:
            return prompt

    def run(self, styles, positive='', negative='', prompt=None, extra_pnginfo=None, my_unique_id=None):
        values = []
        all_styles = {}
        (positive_prompt, negative_prompt) = ('', negative)
        if styles == 'fooocus_styles':
            file = os.path.join(RESOURCES_DIR, styles + '.json')
        else:
            file = os.path.join(FOOOCUS_STYLES_DIR, styles + '.json')
        f = open(file, 'r', encoding='utf-8')
        data = json.load(f)
        f.close()
        for d in data:
            all_styles[d['name']] = d
        if my_unique_id in prompt:
            if prompt[my_unique_id]['inputs']['select_styles']:
                values = prompt[my_unique_id]['inputs']['select_styles'].split(',')
        has_prompt = False
        if len(values) == 0:
            return (positive, negative)
        for (index, val) in enumerate(values):
            if 'prompt' in all_styles[val]:
                if '{prompt}' in all_styles[val]['prompt'] and has_prompt == False:
                    positive_prompt = all_styles[val]['prompt'].format(prompt=positive)
                    has_prompt = True
                else:
                    positive_prompt += ', ' + all_styles[val]['prompt'].replace(', {prompt}', '').replace('{prompt}', '')
            if 'negative_prompt' in all_styles[val]:
                negative_prompt += ', ' + all_styles[val]['negative_prompt'] if negative_prompt else all_styles[val]['negative_prompt']
        if has_prompt == False and positive:
            positive_prompt = positive + ', '
        positive_prompt = self.replace_repeat(positive_prompt) if positive_prompt else ''
        negative_prompt = self.replace_repeat(negative_prompt) if negative_prompt else ''
        return (positive_prompt, negative_prompt)
```