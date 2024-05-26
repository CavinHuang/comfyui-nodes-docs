# Documentation
- Class name: WAS_Text_Shuffle
- Category: WAS Suite/Text/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Shuffle 节点的 `shuffle` 方法旨在重新排列给定文本字符串中的元素顺序。它通过使用指定的分隔符将文本分割成元素列表，随机打乱该列表，然后将元素重新组合成一个新的字符串来操作。这个方法特别适用于需要随机化文本元素的任务，例如数据增强或从固定输入集创建多样化输出。

# Input types
## Required
- text
    - 参数 'text' 表示将要被打乱的输入文本。它是节点操作的基本部分，因为整个过程围绕重新排列此文本的元素。此参数的重要性在于它对输出的直接影响，决定了打乱后文本的内容和结构。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- separator
    - 参数 'separator' 定义了在打乱之前用来将输入文本分割成单独元素的分隔符。它对于确定如何划分文本以及如何重新排列元素至关重要。默认值是逗号，但可以根据正在处理的文本的具体要求调整为任何字符或字符串。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 参数 'seed' 是一个可选的整数，用于初始化随机数生成器，确保打乱的顺序是可复现的。这在希望在节点的多次执行中获得一致结果的场景中特别重要。通过提供种子，用户可以控制随机性，并且每次使用相同的输入和种子值运行节点时都能获得相同的打乱顺序。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- shuffled_text
    - 输出参数 'shuffled_text' 表示打乱过程后得到的文本。它是输入文本在元素被随机重新排列后的直接反映。这个输出很重要，因为它是节点操作的主要结果，也是任何后续处理或分析的基础。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Shuffle:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'separator': ('STRING', {'default': ',', 'multiline': False}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'shuffle'
    CATEGORY = 'WAS Suite/Text/Operations'

    def shuffle(self, text, separator, seed):
        if seed is not None:
            random.seed(seed)
        text_list = text.split(separator)
        random.shuffle(text_list)
        new_text = separator.join(text_list)
        return (new_text,)
```